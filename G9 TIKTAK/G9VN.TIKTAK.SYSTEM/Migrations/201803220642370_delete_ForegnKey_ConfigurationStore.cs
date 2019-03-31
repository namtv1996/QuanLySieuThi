namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class delete_ForegnKey_ConfigurationStore : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ConfigurationStore", "ManageStoreID", "dbo.ManageStore");
            DropIndex("dbo.ConfigurationStore", new[] { "ManageStoreID" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.ConfigurationStore", "ManageStoreID");
            AddForeignKey("dbo.ConfigurationStore", "ManageStoreID", "dbo.ManageStore", "ManageStoreID", cascadeDelete: true);
        }
    }
}
