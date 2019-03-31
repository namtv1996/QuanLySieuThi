namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editFromSalesPromotionAndDetail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.salesPromotion", "PromotionName", c => c.String());
            AddColumn("dbo.salesPromotion", "Object", c => c.Guid());
            AddColumn("dbo.salesPromotionDetail", "PromotionValue", c => c.Decimal(precision: 18, scale: 2));
            AlterColumn("dbo.salesPromotion", "BranchID", c => c.Guid());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.salesPromotion", "BranchID", c => c.Guid(nullable: false));
            DropColumn("dbo.salesPromotionDetail", "PromotionValue");
            DropColumn("dbo.salesPromotion", "Object");
            DropColumn("dbo.salesPromotion", "PromotionName");
        }
    }
}
