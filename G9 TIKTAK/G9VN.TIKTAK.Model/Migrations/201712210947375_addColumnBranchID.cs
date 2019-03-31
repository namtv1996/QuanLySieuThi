namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addColumnBranchID : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Object", "BranchID", c => c.Guid());
            AddColumn("dbo.SaleInvoice", "BranchID", c => c.Guid());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SaleInvoice", "BranchID");
            DropColumn("dbo.Object", "BranchID");
        }
    }
}
