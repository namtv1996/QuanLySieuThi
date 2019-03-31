namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "StoreName", c => c.String(maxLength: 256));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationUsers", "StoreName");
        }
    }
}
