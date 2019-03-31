namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editPuchaseinvoice : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PurchaseInvoice", "INVoucherDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PurchaseInvoice", "INVoucherDate", c => c.DateTime(storeType: "date"));
        }
    }
}
