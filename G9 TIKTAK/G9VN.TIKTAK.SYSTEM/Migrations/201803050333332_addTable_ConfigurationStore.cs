namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTable_ConfigurationStore : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ConfigurationStore",
                c => new
                    {
                        ConfigurationStoreID = c.Guid(nullable: false),
                        ManageStoreID = c.Guid(nullable: false),
                        StoreName = c.String(maxLength: 256),
                        SaleTaxDefault = c.Decimal(precision: 18, scale: 2),
                        PurchaseTaxDefault = c.Decimal(precision: 18, scale: 2),
                        SalePricePolicyDefault = c.Guid(),
                        PurchasePricePolicyDefault = c.Guid(),
                        PaymentScheduleDefault = c.Guid(),
                        PaymentMethodDefault = c.Int(),
                    })
                .PrimaryKey(t => t.ConfigurationStoreID)
                .ForeignKey("dbo.ManageStore", t => t.ManageStoreID, cascadeDelete: true)
                .Index(t => t.ManageStoreID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ConfigurationStore", "ManageStoreID", "dbo.ManageStore");
            DropIndex("dbo.ConfigurationStore", new[] { "ManageStoreID" });
            DropTable("dbo.ConfigurationStore");
        }
    }
}
