namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ObjectEdit : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Object", "ObjectState", c => c.String(maxLength: 255));
            AddColumn("dbo.Object", "ObjectDistrict", c => c.String(maxLength: 255));
            AddColumn("dbo.Object", "ObjectWard", c => c.String(maxLength: 255));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Object", "ObjectWard");
            DropColumn("dbo.Object", "ObjectDistrict");
            DropColumn("dbo.Object", "ObjectState");
        }
    }
}
