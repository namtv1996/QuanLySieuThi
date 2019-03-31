namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class promotionID_in_salesInvoice : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SaleInvoice", "PromotionID", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SaleInvoice", "PromotionID");
        }
    }
}
