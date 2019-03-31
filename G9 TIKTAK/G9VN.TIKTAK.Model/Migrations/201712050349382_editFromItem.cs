namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editFromItem : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Item", "Image", c => c.String(maxLength: 250));
            AlterColumn("dbo.ItemOption", "Image1", c => c.String(maxLength: 250));
            AlterColumn("dbo.ItemOption", "Image2", c => c.String(maxLength: 250));
            AlterColumn("dbo.ItemOption", "Image3", c => c.String(maxLength: 250));
            AlterColumn("dbo.ItemOption", "Image4", c => c.String(maxLength: 250));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ItemOption", "Image4", c => c.String(maxLength: 150));
            AlterColumn("dbo.ItemOption", "Image3", c => c.String(maxLength: 150));
            AlterColumn("dbo.ItemOption", "Image2", c => c.String(maxLength: 150));
            AlterColumn("dbo.ItemOption", "Image1", c => c.String(maxLength: 150));
            AlterColumn("dbo.Item", "Image", c => c.String(maxLength: 150));
        }
    }
}
