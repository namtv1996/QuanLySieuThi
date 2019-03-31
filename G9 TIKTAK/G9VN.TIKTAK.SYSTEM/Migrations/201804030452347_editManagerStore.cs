namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editManagerStore : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ManageStore", "Server", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ManageStore", "Server");
        }
    }
}
