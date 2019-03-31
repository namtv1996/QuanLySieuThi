namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTable_attribute_attributeDetail : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Attribute",
                c => new
                    {
                        AttributeID = c.Guid(nullable: false),
                        Name = c.String(),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.AttributeID);
            
            CreateTable(
                "dbo.AttributeDetail",
                c => new
                    {
                        AttributeDetailID = c.Guid(nullable: false),
                        value = c.String(),
                        AttributeID = c.Guid(nullable: false),
                        ItemOptionID = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.AttributeDetailID)
                .ForeignKey("dbo.Attribute", t => t.AttributeID, cascadeDelete: true)
                .Index(t => t.AttributeID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AttributeDetail", "AttributeID", "dbo.Attribute");
            DropIndex("dbo.AttributeDetail", new[] { "AttributeID" });
            DropTable("dbo.AttributeDetail");
            DropTable("dbo.Attribute");
        }
    }
}
