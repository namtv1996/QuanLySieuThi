namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_attribute : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ItemOption", "Attribute_AttributeID", "dbo.Attribute");
            DropIndex("dbo.ItemOption", new[] { "Attribute_AttributeID" });
            CreateIndex("dbo.AttributeDetail", "ItemOptionID");
            AddForeignKey("dbo.AttributeDetail", "ItemOptionID", "dbo.ItemOption", "ID", cascadeDelete: true);
            DropColumn("dbo.ItemOption", "Attribute_AttributeID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ItemOption", "Attribute_AttributeID", c => c.Guid());
            DropForeignKey("dbo.AttributeDetail", "ItemOptionID", "dbo.ItemOption");
            DropIndex("dbo.AttributeDetail", new[] { "ItemOptionID" });
            CreateIndex("dbo.ItemOption", "Attribute_AttributeID");
            AddForeignKey("dbo.ItemOption", "Attribute_AttributeID", "dbo.Attribute", "AttributeID");
        }
    }
}
