namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_QuantityItem_SalesPromotionDetai : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.salesPromotionDetail", "QuantityItem", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.salesPromotionDetail", "QuantityItem");
        }
    }
}
