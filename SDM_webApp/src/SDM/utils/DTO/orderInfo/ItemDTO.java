package SDM.utils.DTO.orderInfo;

public class ItemDTO {
    private String name;
    private int id;
    private float amount;
    private String sellBy;
    private float totalItemCost;
    private String isPartOfSale;

    public ItemDTO(String name, int id, float amount, String sellBy, float totalItemCost, String isPartOfSale) {
        this.name = name;
        this.id = id;
        this.amount = amount;
        this.sellBy = sellBy;
        this.totalItemCost = totalItemCost;
        this.isPartOfSale = isPartOfSale;
    }

}
