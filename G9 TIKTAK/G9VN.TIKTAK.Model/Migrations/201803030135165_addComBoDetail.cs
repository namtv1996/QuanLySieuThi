namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addComBoDetail : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ComboDetail",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        ComboID = c.Guid(nullable: false),
                        ItemID = c.Guid(nullable: false),
                        QuantityItem = c.Decimal(precision: 18, scale: 2),
                        TransferPrice = c.Int(),
                        TotalAmount = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ComboDetail");
        }
    }
}
