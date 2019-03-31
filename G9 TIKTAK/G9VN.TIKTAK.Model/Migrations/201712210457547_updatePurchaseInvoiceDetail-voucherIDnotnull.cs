namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatePurchaseInvoiceDetailvoucherIDnotnull : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PurchaseInvoiceDetail", "VoucherID", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PurchaseInvoiceDetail", "VoucherID", c => c.Guid());
        }
    }
}
