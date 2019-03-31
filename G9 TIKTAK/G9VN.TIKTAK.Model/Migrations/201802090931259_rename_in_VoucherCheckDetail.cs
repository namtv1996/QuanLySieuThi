namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rename_in_VoucherCheckDetail : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.VoucherCheckDetail", "VoucherCheck_VoucherID", "dbo.VoucherCheck");
            DropIndex("dbo.VoucherCheckDetail", new[] { "VoucherCheck_VoucherID" });
            AddColumn("dbo.VoucherCheckDetail", "VoucherID", c => c.Guid());
            DropColumn("dbo.VoucherCheckDetail", "VoucherCheckID");
            DropColumn("dbo.VoucherCheckDetail", "VoucherCheck_VoucherID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.VoucherCheckDetail", "VoucherCheck_VoucherID", c => c.Guid());
            AddColumn("dbo.VoucherCheckDetail", "VoucherCheckID", c => c.Guid());
            DropColumn("dbo.VoucherCheckDetail", "VoucherID");
            CreateIndex("dbo.VoucherCheckDetail", "VoucherCheck_VoucherID");
            AddForeignKey("dbo.VoucherCheckDetail", "VoucherCheck_VoucherID", "dbo.VoucherCheck", "VoucherID");
        }
    }
}
