namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PrintForm_edit : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PrintForm", "HtmlHeader", c => c.String(maxLength: 4000));
            AddColumn("dbo.PrintForm", "HtmlBody", c => c.String());
            DropColumn("dbo.PrintForm", "HtmlCode");
        }
        
        public override void Down()
        {
            AddColumn("dbo.PrintForm", "HtmlCode", c => c.String());
            DropColumn("dbo.PrintForm", "HtmlBody");
            DropColumn("dbo.PrintForm", "HtmlHeader");
        }
    }
}
