namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ApplicationUsers", "ManageStoreID", "dbo.ManageStore");
            DropIndex("dbo.ApplicationUsers", new[] { "ManageStoreID" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.ApplicationUsers", "ManageStoreID");
            AddForeignKey("dbo.ApplicationUsers", "ManageStoreID", "dbo.ManageStore", "ManageStoreID", cascadeDelete: true);
        }
    }
}
