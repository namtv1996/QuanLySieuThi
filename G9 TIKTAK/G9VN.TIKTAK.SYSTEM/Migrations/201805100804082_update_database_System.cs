namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_database_System : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Notifications", "CreatedBy", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Notifications", "CreatedBy");
        }
    }
}
