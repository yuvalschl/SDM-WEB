package SDM.servlets;

import SDM.utils.ServletUtils;
import com.google.gson.Gson;
import com.sun.org.apache.xml.internal.utils.StringBufferPool;
import logicSDM.AllZonesManager.AllZonesManager;
import logicSDM.Exceptions.DuplicateValueException;
import logicSDM.Exceptions.InvalidValueException;
import logicSDM.Exceptions.ItemNotSoldException;
import logicSDM.Jaxb.JaxbClassToStoreManager;
import logicSDM.Jaxb.XmlToObject;
import logicSDM.StoreManager.StoreManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.Scanner;

@MultipartConfig(fileSizeThreshold =  1024 * 1024, maxFileSize = 1024 * 1024, maxRequestSize = 1024 * 1024 * 5 * 5)
public class UploadFileServlet extends HttpServlet{

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
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
            storeManager = jaxbClassToStoreManager.convertJaxbClassToStoreManager(XmlToObject.fromXmlFileToObject(file));
        } catch (DuplicateValueException | InvalidValueException | ItemNotSoldException | InterruptedException e) {
            e.printStackTrace();
        }
        AllZonesManager allZonesManager = ServletUtils.getAllZoneManager(getServletContext());
        allZonesManager.addZone(storeManager);
        response.getOutputStream().write("file uploaded".getBytes());
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