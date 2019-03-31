namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_VersionToStore : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ManageStore", "Version", c => c.String(maxLength: 50));
            AddColumn("dbo.ManageStore", "Logo", c => c.String(maxLength: 200));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ManageStore", "Logo");
            DropColumn("dbo.ManageStore", "Version");
        }
    }
}
