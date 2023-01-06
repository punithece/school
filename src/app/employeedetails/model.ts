export class Product {
    public ProductID: any;
    public ProductName = '';
    public Discontinued? = false;
    public UnitsInStock?: number;
    public UnitPrice = 0;
    public Category = {
        CategoryID: 0,
        CategoryName: ''
    };
}

export class Order {
    public OrderID: any;
    public CustomerID: any;
    public EmployeeID: any;
    public OrderDate: any;
    public RequiredDate: any;
    public ShippedDate: any;
    public ShipVia: any;
    public Freight: any;
    public ShipName: any;
    public ShipAddress: any;
    public ShipCity: any;
    public ShipRegion: any;
    public ShipPostalCode: any;
    public ShipCountry: any;
}

export class Customer {
    public Id = '';
    public CompanyName = '';
    public ContactName = '';
    public ContactTitle = '';
    public Address?: string = '';
    public City = '';
    public PostalCode? = '';
    public Country? = '';
    public Phone? = '';
    public Fax? = '';
}

export class Category {
    public CategoryID?: number;
    public CategoryName?: string;
    public Description?: string;
}
