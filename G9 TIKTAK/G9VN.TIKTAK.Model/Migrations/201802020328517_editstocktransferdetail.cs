namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editstocktransferdetail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.StockTransferDetail", "QuantityItem", c => c.Int());
            AddColumn("dbo.StockTransferDetail", "transferPrice", c => c.Int());
            AddColumn("dbo.StockTransferDetail", "importPrice", c => c.Int());
            AddColumn("dbo.StockTransferDetail", "ConversionPrice", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.StockTransferDetail", "ConversionPrice");
            DropColumn("dbo.StockTransferDetail", "importPrice");
            DropColumn("dbo.StockTransferDetail", "transferPrice");
            DropColumn("dbo.StockTransferDetail", "QuantityItem");
        }
    }
}
