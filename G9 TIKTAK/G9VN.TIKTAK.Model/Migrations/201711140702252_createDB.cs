namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class createDB : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Item", "Unit", c => c.String(maxLength: 50));
            DropColumn("dbo.ItemOption", "Unit");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ItemOption", "Unit", c => c.String(maxLength: 50));
            DropColumn("dbo.Item", "Unit");
        }
    }
}
