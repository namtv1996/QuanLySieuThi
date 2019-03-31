namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_SalesPromotion_Detail3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.salesPromotionDetail", "ItemID", c => c.Guid());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.salesPromotionDetail", "ItemID", c => c.Guid(nullable: false));
        }
    }
}
