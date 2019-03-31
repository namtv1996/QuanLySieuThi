namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addOriginalVoucherNo : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SaleInvoice", "OriginalVoucherNo", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SaleInvoice", "OriginalVoucherNo");
        }
    }
}
