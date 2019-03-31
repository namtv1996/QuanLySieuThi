namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editApplicationUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "StoreName", c => c.String(maxLength: 256));
            AddColumn("dbo.ApplicationUsers", "Business", c => c.String(maxLength: 256));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationUsers", "Business");
            DropColumn("dbo.ApplicationUsers", "StoreName");
        }
    }
}
