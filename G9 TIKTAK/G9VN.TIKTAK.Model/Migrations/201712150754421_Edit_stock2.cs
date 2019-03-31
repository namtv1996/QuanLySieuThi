namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Edit_stock2 : DbMigration
    {
        public override void Up()
        {

            AddColumn("dbo.Stock", "InitialInventory", c => c.Decimal(nullable: false, precision: 18, scale: 2));

        }
           
        
        public override void Down()
        {
            AddColumn("dbo.Object", "ObjectWard", c => c.String(maxLength: 255));
            AddColumn("dbo.Object", "ObjectDistrict", c => c.String(maxLength: 255));
            AddColumn("dbo.Object", "ObjectState", c => c.String(maxLength: 255));
            AddColumn("dbo.Stock", "Status", c => c.Boolean());
            AddColumn("dbo.Stock", "Desription", c => c.String(maxLength: 500));
            AddColumn("dbo.Stock", "StockCode", c => c.String(maxLength: 150, unicode: false));
            AddColumn("dbo.Stock", "StockName", c => c.String(maxLength: 150));
            DropForeignKey("dbo.Stock", "BranchID", "dbo.Branch");
            DropIndex("dbo.Stock", new[] { "BranchID" });
            AlterColumn("dbo.Stock", "BranchID", c => c.Guid());
            DropColumn("dbo.Stock", "InitialInventory");
            DropColumn("dbo.Stock", "Quantity");
            DropColumn("dbo.Stock", "ItemOptionID");
            CreateIndex("dbo.Stock", "BranchID");
            AddForeignKey("dbo.Stock", "BranchID", "dbo.Branch", "BranchID");
        }
    }
}
