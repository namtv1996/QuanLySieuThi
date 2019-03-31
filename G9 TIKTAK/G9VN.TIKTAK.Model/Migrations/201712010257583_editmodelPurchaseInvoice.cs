namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editmodelPurchaseInvoice : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PurchaseInvoice", "InvoiceExportStatus", c => c.Int());
            AlterColumn("dbo.PurchaseInvoice", "StockImportStatus", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PurchaseInvoice", "StockImportStatus", c => c.Boolean());
            AlterColumn("dbo.PurchaseInvoice", "InvoiceExportStatus", c => c.Boolean());
        }
    }
}
