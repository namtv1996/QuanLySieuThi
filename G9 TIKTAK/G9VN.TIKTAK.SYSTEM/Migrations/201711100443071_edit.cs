namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ManageStore", "UserName");
            DropColumn("dbo.ManageStore", "FullName");
            DropColumn("dbo.ManageStore", "Email");
            DropColumn("dbo.ManageStore", "PhoneNumber");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ManageStore", "PhoneNumber", c => c.String());
            AddColumn("dbo.ManageStore", "Email", c => c.String());
            AddColumn("dbo.ManageStore", "FullName", c => c.String(maxLength: 256));
            AddColumn("dbo.ManageStore", "UserName", c => c.String());
        }
    }
}
