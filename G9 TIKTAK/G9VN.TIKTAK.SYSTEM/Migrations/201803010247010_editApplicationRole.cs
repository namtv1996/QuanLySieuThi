namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editApplicationRole : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationRoles", "type", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationRoles", "type");
        }
    }
}
