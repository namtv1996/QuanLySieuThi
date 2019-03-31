namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editpromotiontype_salespromotiondetail : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.salesPromotionDetail", "PromotionType", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.salesPromotionDetail", "PromotionType", c => c.Boolean(nullable: false));
        }
    }
}
