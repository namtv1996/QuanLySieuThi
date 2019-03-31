namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_SaleInvoice : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.SaleInvoice", "VoucherDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.SaleInvoice", "VoucherDate", c => c.DateTime(storeType: "date"));
        }
    }
}
