namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_SalesPromotion_Detail2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.salesPromotionDetail", "VoucherType", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.salesPromotionDetail", "VoucherType", c => c.Int(nullable: false));
        }
    }
}
