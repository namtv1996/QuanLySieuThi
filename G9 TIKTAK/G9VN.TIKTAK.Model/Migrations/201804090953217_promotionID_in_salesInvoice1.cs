namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class promotionID_in_salesInvoice1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.SaleInvoice", "PromotionID", c => c.Guid());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.SaleInvoice", "PromotionID", c => c.Guid(nullable: false));
        }
    }
}
