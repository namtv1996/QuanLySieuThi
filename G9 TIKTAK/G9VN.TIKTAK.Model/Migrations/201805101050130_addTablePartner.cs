namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTablePartner : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Partner",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Status = c.Boolean(),
                        StoreName = c.String(maxLength: 50),
                        PartnerName = c.String(maxLength: 50),
                        NameSignIn = c.String(maxLength: 50),
                        PassSignIn = c.String(maxLength: 50),
                        BankID = c.Guid(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Partner");
        }
    }
}
