namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editstocktransferdetailnull : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.StockTransferDetail", "EmployeeID", c => c.Guid());
            AlterColumn("dbo.StockTransferDetail", "ObjectID", c => c.Guid());
            AlterColumn("dbo.StockTransferDetail", "StatisticItemID", c => c.Guid());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.StockTransferDetail", "StatisticItemID", c => c.Guid(nullable: false));
            AlterColumn("dbo.StockTransferDetail", "ObjectID", c => c.Guid(nullable: false));
            AlterColumn("dbo.StockTransferDetail", "EmployeeID", c => c.Guid(nullable: false));
        }
    }
}
