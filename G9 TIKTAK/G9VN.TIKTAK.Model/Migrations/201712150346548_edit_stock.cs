namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_stock : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Stock", "BranchID", "dbo.Branch");
            DropIndex("dbo.Stock", new[] { "BranchID" });
            AddColumn("dbo.Stock", "ItemOptionID", c => c.Guid(nullable: false));
            AddColumn("dbo.Stock", "Quantity", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Stock", "InitialInventory", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.Stock", "BranchID", c => c.Guid(nullable: false));
            CreateIndex("dbo.Stock", "BranchID");
            AddForeignKey("dbo.Stock", "BranchID", "dbo.Branch", "BranchID", cascadeDelete: true);
            DropColumn("dbo.Stock", "StockName");
            DropColumn("dbo.Stock", "StockCode");
            DropColumn("dbo.Stock", "Desription");
            DropColumn("dbo.Stock", "Status");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Stock", "Status", c => c.Boolean());
            AddColumn("dbo.Stock", "Desription", c => c.String(maxLength: 500));
            AddColumn("dbo.Stock", "StockCode", c => c.String(maxLength: 150, unicode: false));
            AddColumn("dbo.Stock", "StockName", c => c.String(maxLength: 150));
            DropForeignKey("dbo.Stock", "BranchID", "dbo.Branch");
            DropIndex("dbo.Stock", new[] { "BranchID" });
            AlterColumn("dbo.Stock", "BranchID", c => c.Guid());
            DropColumn("dbo.Stock", "Quantity");
            DropColumn("dbo.Stock", "ItemOptionID");
            DropColumn("dbo.Stock", "InitialInventory");
            CreateIndex("dbo.Stock", "BranchID");
            AddForeignKey("dbo.Stock", "BranchID", "dbo.Branch", "BranchID");
        }
    }
}
