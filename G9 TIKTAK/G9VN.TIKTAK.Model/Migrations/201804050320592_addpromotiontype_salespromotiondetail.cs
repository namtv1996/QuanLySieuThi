namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addpromotiontype_salespromotiondetail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.salesPromotionDetail", "PromotionType", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.salesPromotionDetail", "PromotionType");
        }
    }
}
