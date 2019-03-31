namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addColumn_DiscountReason_inPurchaseInvoice_SaleInvoice : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PurchaseInvoiceDetail", "DiscountReason", c => c.String(maxLength: 100));
            AddColumn("dbo.SaleInvoiceDetail", "DiscountReason", c => c.String(maxLength: 100));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SaleInvoiceDetail", "DiscountReason");
            DropColumn("dbo.PurchaseInvoiceDetail", "DiscountReason");
        }
    }
}
