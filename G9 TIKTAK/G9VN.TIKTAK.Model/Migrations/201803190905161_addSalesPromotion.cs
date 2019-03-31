namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addSalesPromotion : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.salesPromotion",
                c => new
                    {
                        VoucherID = c.Guid(nullable: false),
                        VoucherType = c.Int(nullable: false),
                        VoucherNo = c.String(maxLength: 50),
                        VoucherDate = c.DateTime(nullable: false),
                        ApplyQuantity = c.Int(nullable: false),
                        Description = c.String(maxLength: 255),
                        CreateDate = c.DateTime(),
                        Expirydate = c.DateTime(),
                        Status = c.Boolean(nullable: false),
                        BranchID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.VoucherID);
            
            CreateTable(
                "dbo.salesPromotionDetail",
                c => new
                    {
                        VoucherDetailID = c.Guid(nullable: false),
                        VoucherID = c.Guid(nullable: false),
                        ItemID = c.Guid(nullable: false),
                        QuantityItem = c.Int(),
                        DiscountAmount = c.Decimal(nullable: false, storeType: "money"),
                        ConditionsMax = c.Decimal(precision: 18, scale: 2),
                        ConditionsMin = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.VoucherDetailID)
                .ForeignKey("dbo.salesPromotion", t => t.VoucherID, cascadeDelete: true)
                .Index(t => t.VoucherID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.salesPromotionDetail", "VoucherID", "dbo.salesPromotion");
            DropIndex("dbo.salesPromotionDetail", new[] { "VoucherID" });
            DropTable("dbo.salesPromotionDetail");
            DropTable("dbo.salesPromotion");
        }
    }
}
