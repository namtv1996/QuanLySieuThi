namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addRelationshipsItemOptionVSStock : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Stock", "ItemOptionID");
            AddForeignKey("dbo.Stock", "ItemOptionID", "dbo.ItemOption", "ID", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Stock", "ItemOptionID", "dbo.ItemOption");
            DropIndex("dbo.Stock", new[] { "ItemOptionID" });
        }
    }
}