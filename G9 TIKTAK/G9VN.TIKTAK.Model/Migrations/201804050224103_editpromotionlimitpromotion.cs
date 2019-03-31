namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editpromotionlimitpromotion : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.salesPromotionDetail", "LimitPromotion", c => c.Int());
            DropColumn("dbo.salesPromotionDetail", "DiscountAmount");
        }
        
        public override void Down()
        {
            AddColumn("dbo.salesPromotionDetail", "DiscountAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.salesPromotionDetail", "LimitPromotion");
        }
    }
}
