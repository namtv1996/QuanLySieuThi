namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editstocktransferbranhid : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.StockTransfer", "BranchID", c => c.Guid());
        }
        
        public override void Down()
        {
            DropColumn("dbo.StockTransfer", "BranchID");
        }
    }
}
