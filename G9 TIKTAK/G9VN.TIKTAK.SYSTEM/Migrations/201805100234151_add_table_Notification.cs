namespace G9VN.TIKTAK.SYSTEM.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_table_Notification : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Notifications",
                c => new
                    {
                        NotificationID = c.Guid(nullable: false),
                        Contents = c.String(maxLength: 600),
                        Status = c.Int(),
                        ManageStoreID = c.Guid(),
                    })
                .PrimaryKey(t => t.NotificationID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Notifications");
        }
    }
}
