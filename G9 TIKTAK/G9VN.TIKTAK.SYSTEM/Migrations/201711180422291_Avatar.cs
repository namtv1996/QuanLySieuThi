namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Avatar : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "Avatar", c => c.String(maxLength: 250));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationUsers", "Avatar");
        }
    }
}
