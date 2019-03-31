namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateAdvancedSettingObject : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ObjectCategory", "PricePolicyID", "dbo.PricePolicy");
            DropIndex("dbo.ObjectCategory", new[] { "PricePolicyID" });
            AddColumn("dbo.Object", "ApplyIncentives", c => c.Int());
            AddColumn("dbo.Object", "PricePolicyDefault", c => c.Guid());
            AddColumn("dbo.Object", "TaxRateDefault", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.Object", "DiscountRateDefault", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.Object", "PaymentMethodDefault", c => c.Int());
            AddColumn("dbo.Object", "PaymentScheduleDefault", c => c.Guid());
            AddColumn("dbo.ObjectCategory", "PricePolicyDefault", c => c.Guid());
            AddColumn("dbo.ObjectCategory", "TaxRateDefault", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.ObjectCategory", "DiscountRateDefault", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.ObjectCategory", "PaymentMethodDefault", c => c.Int());
            AddColumn("dbo.ObjectCategory", "PaymentScheduleDefault", c => c.Guid());
            DropColumn("dbo.ObjectCategory", "PricePolicyID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ObjectCategory", "PricePolicyID", c => c.Guid());
            DropColumn("dbo.ObjectCategory", "PaymentScheduleDefault");
            DropColumn("dbo.ObjectCategory", "PaymentMethodDefault");
            DropColumn("dbo.ObjectCategory", "DiscountRateDefault");
            DropColumn("dbo.ObjectCategory", "TaxRateDefault");
            DropColumn("dbo.ObjectCategory", "PricePolicyDefault");
            DropColumn("dbo.Object", "PaymentScheduleDefault");
            DropColumn("dbo.Object", "PaymentMethodDefault");
            DropColumn("dbo.Object", "DiscountRateDefault");
            DropColumn("dbo.Object", "TaxRateDefault");
            DropColumn("dbo.Object", "PricePolicyDefault");
            DropColumn("dbo.Object", "ApplyIncentives");
            CreateIndex("dbo.ObjectCategory", "PricePolicyID");
            AddForeignKey("dbo.ObjectCategory", "PricePolicyID", "dbo.PricePolicy", "PricePolicyID");
        }
    }
}
