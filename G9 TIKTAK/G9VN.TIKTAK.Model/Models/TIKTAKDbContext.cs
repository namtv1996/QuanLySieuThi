namespace G9VN.TIKTAK.Model.Models
{
    using Extensions;
    using System.Data.Entity;

    public partial class TIKTAKDbContext : DbContext
    {
        public TIKTAKDbContext()
          //: base("DbContext_" + ExtensisonUser.GetStoreName(System.Web.HttpContext.Current.User.Identity.Name))
            : base("DbContext_localhost")
        {
        }

        public virtual DbSet<Bank> Bank { get; set; }
        public virtual DbSet<BankTransfer> BankTransfer { get; set; }
        public virtual DbSet<BankTransferDetail> BankTransferDetail { get; set; }
        public virtual DbSet<Branch> Branch { get; set; }
        public virtual DbSet<Error> Errors { get; set; }
        public virtual DbSet<InvoiceType> InvoiceType { get; set; }
        public virtual DbSet<Item> Item { get; set; }
        public virtual DbSet<ItemCategory> ItemCategory { get; set; }
        public virtual DbSet<ItemOption> ItemOption { get; set; }
        public virtual DbSet<Object1> Object { get; set; }
        public virtual DbSet<ObjectCategory> ObjectCategory { get; set; }
        public virtual DbSet<ObjectKind> ObjectKind { get; set; }
        public virtual DbSet<PaymentSchedule> PaymentSchedule { get; set; }
        public virtual DbSet<PricePolicy> PricePolicy { get; set; }
        public virtual DbSet<PrintForm> PrintForm { get; set; }
        public virtual DbSet<PublicInvoiceType> PublicInvoiceType { get; set; }
        public virtual DbSet<PublicInvoiceTypeDetail> PublicInvoiceTypeDetail { get; set; }
        public virtual DbSet<PurchaseInvoice> PurchaseInvoice { get; set; }
        public virtual DbSet<PurchaseInvoiceDetail> PurchaseInvoiceDetail { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<SaleInvoice> SaleInvoice { get; set; }
        public virtual DbSet<SaleInvoiceDetail> SaleInvoiceDetail { get; set; }
        public virtual DbSet<Stock> Stock { get; set; }
        public virtual DbSet<StockTransfer> StockTransfer { get; set; }
        public virtual DbSet<StockTransferDetail> StockTransferDetail { get; set; }
        public virtual DbSet<StoreInfo> StoreInfo { get; set; }
        public virtual DbSet<SYSAuditingLog> SYSAuditingLog { get; set; }
        public virtual DbSet<Transporter> Transporter { get; set; }
        public virtual DbSet<Unit> Unit { get; set; }
        public virtual DbSet<VoucherCheck> VoucherCheck { get; set; }
        public virtual DbSet<VoucherCheckDetail> VoucherCheckDetail { get; set; }
        public virtual DbSet<VoucherType> VoucherType { get; set; }
        public virtual DbSet<AttributeDetail> AttriButeDetail { get; set; }
        public virtual DbSet<Attribute> AttriBute { get; set; }
        public virtual DbSet<ComboDetail> ComboDetail { get; set; }
        public virtual DbSet<SalesPromotion> salesPromotion { get; set; }
        public virtual DbSet<SalesPromotionDetail> salesPromotionDetail { get; set; }
        public virtual DbSet<Partner> Partner { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BankTransfer>()
                .Property(e => e.TotalAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<BankTransfer>()
                .Property(e => e.TotalAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<BankTransferDetail>()
                .Property(e => e.AmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<BankTransferDetail>()
                .Property(e => e.Amount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Branch>()
                .Property(e => e.TelephoneNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Branch>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<InvoiceType>()
                .HasMany(e => e.PublicInvoiceTypeDetail)
                .WithRequired(e => e.InvoiceType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ItemOption>()
                .Property(e => e.Barcode)
                .IsUnicode(false);

            modelBuilder.Entity<ItemOption>()
                .Property(e => e.SKU)
                .IsUnicode(false);

            modelBuilder.Entity<ItemOption>()
                .Property(e => e.Weigh)
                .IsFixedLength();

            modelBuilder.Entity<ItemOption>()
                .Property(e => e.TaxRate)
                .HasPrecision(18, 8);

            modelBuilder.Entity<ItemOption>()
                .Property(e => e.SalePrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ItemOption>()
                .Property(e => e.PurchasePrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ItemOption>()
                .Property(e => e.InitialPrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<ItemOption>()
                .Property(e => e.WholesalePrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Object1>()
                .Property(e => e.DiscountRate)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Object1>()
                .Property(e => e.Debt)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Object1>()
                .Property(e => e.Sex)
                .IsFixedLength();

            modelBuilder.Entity<PublicInvoiceType>()
                .HasMany(e => e.PublicInvoiceTypeDetail)
                .WithRequired(e => e.PublicInvoiceType)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.ExchangeRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalPaymentAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalImportTaxAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalImportTaxAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalVATAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalVATAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.DiscountForInvoice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalDiscountAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalDiscountAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalFreightAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalFreightAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalOutwardAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalOutwardAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalImportTaxExpenseAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(e => e.TotalImportTaxExpenseAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.QuantityConvert)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.UnitPriceOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.UnitPrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.UnitPriceConvertOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.UnitPriceConvert)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.AmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.Amount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.DiscountRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.DiscountAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.DiscountAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.ImportTaxRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.ImportTaxAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.ImportTaxAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.VATRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.VATAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.VATAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.OutwardPriceOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.OutwardPrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.OutwardAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.OutwardAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.CustomsUnitPriceOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.CustomsUnitPrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.SpecialConsumeTaxRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.SpecialConsumeTaxAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.SpecialConsumeTaxAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.FreightAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.FreightAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.ConvertRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.UnitPriceAfterTaxOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.UnitPriceAfterTax)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.AmountAfterTaxOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.AmountAfterTax)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.ImportTaxExpenseAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.ImportTaxExpenseAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.DiscountAmountAfterTax)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.DiscountAmountAfterTaxOC)
                .HasPrecision(22, 8);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.OutwardPriceConvertOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<PurchaseInvoiceDetail>()
                .Property(e => e.OutwardPriceConvert)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.ExchangeRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.DiscountRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.DiscountAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.DiscountAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.TotalAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.TotalAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.TotalDiscountAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.TotalDiscountAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.TotalVATAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.TotalVATAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.TotalOutwardAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.CommisionRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.CommisionAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoice>()
                .Property(e => e.CommisionAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.Quantity)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.QuantityConvert)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.UnitPriceOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.UnitPrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.UnitPriceConvertOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.UnitPriceConvert)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.AmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.Amount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.DiscountRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.DiscountAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.DiscountAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.VATRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.VATAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.VATAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.OutwardPrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.OutwardAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.SpecialConsumeTaxRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.SpecialConsumeTaxAmountOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.SpecialConsumeTaxAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.SpecialConsumeUnitPriceOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.SpecialConsumeUnitPrice)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.ConvertRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.UnitPriceAfterTaxOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.UnitPriceAfterTax)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.AmountAfterTaxOC)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.AmountAfterTax)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.DiscountAmountAfterTax)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.DiscountAmountAfterTaxOC)
                .HasPrecision(22, 8);

            modelBuilder.Entity<SaleInvoiceDetail>()
                .Property(e => e.OutwardPriceConvert)
                .HasPrecision(19, 4);

            modelBuilder.Entity<StockTransfer>()
                .Property(e => e.TotalAmount)
                .HasPrecision(19, 4);

            modelBuilder.Entity<StockTransfer>()
                .HasMany(e => e.StockTransferDetail)
                .WithRequired(e => e.StockTransfer)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<StockTransferDetail>()
                .Property(e => e.ConvertRate)
                .HasPrecision(22, 8);

            modelBuilder.Entity<StoreInfo>()
                .Property(e => e.DomainName)
                .IsUnicode(false);

            modelBuilder.Entity<VoucherCheck>()
                .Property(e => e.Tags)
                .IsUnicode(false);

           
        }
    }
}