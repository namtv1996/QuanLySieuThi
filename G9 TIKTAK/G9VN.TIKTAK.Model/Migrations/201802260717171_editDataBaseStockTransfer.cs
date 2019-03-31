namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editDataBaseStockTransfer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.StockTransfer", "Reference", c => c.String());
            AddColumn("dbo.StockTransfer", "FromStockID", c => c.Guid(nullable: false));
            AddColumn("dbo.StockTransfer", "ToStockID", c => c.Guid(nullable: false));
            AddColumn("dbo.StockTransfer", "Description", c => c.String(maxLength: 255));
            DropColumn("dbo.StockTransferDetail", "Description");
            DropColumn("dbo.StockTransferDetail", "FromStockID");
            DropColumn("dbo.StockTransferDetail", "ToStockID");
            DropColumn("dbo.StockTransferDetail", "EmployeeID");
            DropColumn("dbo.StockTransferDetail", "ObjectID");
            DropColumn("dbo.StockTransferDetail", "ExpiryDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.StockTransferDetail", "ExpiryDate", c => c.DateTime());
            AddColumn("dbo.StockTransferDetail", "ObjectID", c => c.Guid());
            AddColumn("dbo.StockTransferDetail", "EmployeeID", c => c.Guid());
            AddColumn("dbo.StockTransferDetail", "ToStockID", c => c.Guid(nullable: false));
            AddColumn("dbo.StockTransferDetail", "FromStockID", c => c.Guid(nullable: false));
            AddColumn("dbo.StockTransferDetail", "Description", c => c.String(maxLength: 255));
            DropColumn("dbo.StockTransfer", "Description");
            DropColumn("dbo.StockTransfer", "ToStockID");
            DropColumn("dbo.StockTransfer", "FromStockID");
            DropColumn("dbo.StockTransfer", "Reference");
        }
    }
}
