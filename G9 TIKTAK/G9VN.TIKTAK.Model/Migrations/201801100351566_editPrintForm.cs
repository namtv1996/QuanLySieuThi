namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editPrintForm : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PrintForm", "HtmlCode", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PrintForm", "HtmlCode", c => c.String(maxLength: 4000));
        }
    }
}
