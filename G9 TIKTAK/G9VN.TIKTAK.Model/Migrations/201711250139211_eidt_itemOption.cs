namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class eidt_itemOption : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ItemOption", "MinimumInventory", c => c.Double());
            AddColumn("dbo.ItemOption", "MaximumInventory", c => c.Double());
            AddColumn("dbo.ItemOption", "NotificationInventory", c => c.Boolean());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ItemOption", "NotificationInventory");
            DropColumn("dbo.ItemOption", "MaximumInventory");
            DropColumn("dbo.ItemOption", "MinimumInventory");
        }
    }
}
