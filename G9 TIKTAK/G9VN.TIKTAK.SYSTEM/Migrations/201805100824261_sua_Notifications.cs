namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sua_Notifications : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Notifications", "CreatedDate", c => c.DateTime());
           
        }
        
        public override void Down()
        {
           
            DropColumn("dbo.Notifications", "CreatedDate");
        }
    }
}
