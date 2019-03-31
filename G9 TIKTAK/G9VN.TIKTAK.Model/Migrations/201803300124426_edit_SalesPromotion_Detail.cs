namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_SalesPromotion_Detail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.salesPromotionDetail", "VoucherType", c => c.Int(nullable: false));
            AlterColumn("dbo.salesPromotionDetail", "DiscountAmount", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.salesPromotionDetail", "QuantityItem");
        }
        
        public override void Down()
        {
            AddColumn("dbo.salesPromotionDetail", "QuantityItem", c => c.Int());
            AlterColumn("dbo.salesPromotionDetail", "DiscountAmount", c => c.Decimal(nullable: false, storeType: "money"));
            DropColumn("dbo.salesPromotionDetail", "VoucherType");
        }
    }
}
