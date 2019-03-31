namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDebtInSaleInvoice : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SaleInvoice", "Debt", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SaleInvoice", "Debt");
        }
    }
}
