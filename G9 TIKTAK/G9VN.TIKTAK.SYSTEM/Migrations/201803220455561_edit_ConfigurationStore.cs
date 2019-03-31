namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_ConfigurationStore : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.ConfigurationStore", "ManageStoreID");
            AddForeignKey("dbo.ConfigurationStore", "ManageStoreID", "dbo.ManageStore", "ManageStoreID", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ConfigurationStore", "ManageStoreID", "dbo.ManageStore");
            DropIndex("dbo.ConfigurationStore", new[] { "ManageStoreID" });
        }
    }
}
