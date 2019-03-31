namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_Description_SaleInvoice_PurchaseInvoice : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PurchaseInvoice", "Description", c => c.String(maxLength: 250));
            AddColumn("dbo.SaleInvoice", "Description", c => c.String(maxLength: 250));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SaleInvoice", "Description");
            DropColumn("dbo.PurchaseInvoice", "Description");
        }
    }
}
