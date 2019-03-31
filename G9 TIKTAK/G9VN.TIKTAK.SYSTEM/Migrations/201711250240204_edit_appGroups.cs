namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_appGroups : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationGroups", "ManageStoreID", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationGroups", "ManageStoreID");
        }
    }
}
