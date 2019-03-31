namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class editVouchertype : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.VoucherType", "Status", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.VoucherType", "Status", c => c.String(maxLength: 10, fixedLength: true));
        }
    }
}
