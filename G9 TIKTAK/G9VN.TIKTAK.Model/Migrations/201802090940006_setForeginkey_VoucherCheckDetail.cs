namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class setForeginkey_VoucherCheckDetail : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.VoucherCheckDetail", "VoucherID");
            AddForeignKey("dbo.VoucherCheckDetail", "VoucherID", "dbo.VoucherCheck", "VoucherID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.VoucherCheckDetail", "VoucherID", "dbo.VoucherCheck");
            DropIndex("dbo.VoucherCheckDetail", new[] { "VoucherID" });
        }
    }
}
