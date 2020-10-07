package SDM.servlets;

;
import SDM.utils.ServletUtils;
import SDM.utils.SessionUtils;
import SDM.utils.ZoneInfo;
import com.google.gson.Gson;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Exceptions.DuplicateValueException;
import logicSDM.Exceptions.InvalidValueException;
import logicSDM.Exceptions.ItemNotSoldException;
import logicSDM.Item.Item;
import logicSDM.Jaxb.JaxbClassToStoreManager;
import logicSDM.Jaxb.XmlToObject;
import logicSDM.Store.Store;
import logicSDM.StoreManager.StoreManager;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Scanner;

@MultipartConfig(fileSizeThreshold =  1024 * 1024, maxFileSize = 1024 * 1024, maxRequestSize = 1024 * 1024 * 5 * 5)
public class UploadFileServlet extends HttpServlet{

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Collection<Part> parts = request.getParts();
        StringBuilder xml = new StringBuilder();
        for(Part part : parts){
            xml.append(readFromInputStream(part.getInputStream()));
        }
        FileWriter fileWriter = new FileWriter("xml.xml");
        fileWriter.write(xml.toString());
        fileWriter.close();
        File file = new File("xml.xml");
        JaxbClassToStoreManager jaxbClassToStoreManager = new JaxbClassToStoreManager();
        StoreManager storeManager = null;
        try {
            String userName = SessionUtils.getUsername(request);
            storeManager = jaxbClassToStoreManager.convertJaxbClassToStoreManager(XmlToObject.fromXmlFileToObject(file), userName);
        } catch (DuplicateValueException | InvalidValueException | ItemNotSoldException | InterruptedException e) {
            e.printStackTrace();
        }
        AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
        assert storeManager != null;
        if(allZonesManager.getAllZones().containsKey(storeManager.getZoneName())){
            response.setStatus(HttpServletResponse.SC_CONFLICT);
            response.getWriter().println("zone: " + storeManager.getZoneName() + " already in the system");
        }
        else {
            allZonesManager.addZone(storeManager);
            response.getWriter().println(new Gson().toJson(new ZoneInfo(storeManager)));
        }
    }

    private String readFromInputStream(InputStream inputStream) {
        return new Scanner(inputStream).useDelimiter("\\Z").next();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }
}