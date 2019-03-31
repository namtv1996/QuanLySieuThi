namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class edit_itemOption1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.ItemOption", "MinimumInventory", c => c.Decimal(precision: 18, scale: 2));
            AlterColumn("dbo.ItemOption", "MaximumInventory", c => c.Decimal(precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ItemOption", "MaximumInventory", c => c.Double());
            AlterColumn("dbo.ItemOption", "MinimumInventory", c => c.Double());
        }
    }
}
