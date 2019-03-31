namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_SaleInvoice1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SaleInvoice", "ObjectName", c => c.String(maxLength: 255));
            AddColumn("dbo.SaleInvoice", "ObjectAddress", c => c.String(maxLength: 255));
            AddColumn("dbo.SaleInvoice", "ObjectTel", c => c.String(maxLength: 50));
            AddColumn("dbo.SaleInvoice", "ShippingAmount", c => c.Decimal(nullable: false, storeType: "money"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SaleInvoice", "ShippingAmount");
            DropColumn("dbo.SaleInvoice", "ObjectTel");
            DropColumn("dbo.SaleInvoice", "ObjectAddress");
            DropColumn("dbo.SaleInvoice", "ObjectName");
        }
    }
}
