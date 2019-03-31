namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_datatype_PurchaseInvoiceDetail : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PurchaseInvoiceDetail", "Quantity", c => c.Decimal(precision: 18, scale: 2));
            AlterColumn("dbo.SaleInvoiceDetail", "Quantity", c => c.Decimal(precision: 22, scale: 8));
            AlterColumn("dbo.VoucherCheckDetail", "InStock", c => c.Decimal(precision: 18, scale: 2));
            AlterColumn("dbo.VoucherCheckDetail", "AfterCheck", c => c.Decimal(precision: 18, scale: 2));
            AlterColumn("dbo.VoucherCheckDetail", "Result", c => c.Decimal(precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.VoucherCheckDetail", "Result", c => c.Int());
            AlterColumn("dbo.VoucherCheckDetail", "AfterCheck", c => c.Int());
            AlterColumn("dbo.VoucherCheckDetail", "InStock", c => c.Int());
            AlterColumn("dbo.SaleInvoiceDetail", "Quantity", c => c.Decimal(nullable: false, precision: 22, scale: 8));
            AlterColumn("dbo.PurchaseInvoiceDetail", "Quantity", c => c.Int());
        }
    }
}
