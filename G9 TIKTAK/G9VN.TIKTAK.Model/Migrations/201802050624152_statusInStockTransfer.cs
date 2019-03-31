namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class statusInStockTransfer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.StockTransfer", "Status", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.StockTransfer", "Status");
        }
    }
}
