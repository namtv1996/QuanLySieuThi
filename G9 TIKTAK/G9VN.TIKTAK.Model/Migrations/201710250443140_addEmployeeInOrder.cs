namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addEmployeeInOrder : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SaleInvoice", "Employee", c => c.String(maxLength: 100));
            DropColumn("dbo.SaleInvoice", "EmployeeID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SaleInvoice", "EmployeeID", c => c.Guid());
            DropColumn("dbo.SaleInvoice", "Employee");
        }
    }
}
