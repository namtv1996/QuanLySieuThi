namespace G9VN.TIKTAK.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Bank",
                c => new
                    {
                        BankID = c.Guid(nullable: false),
                        BankAccount = c.String(maxLength: 150),
                        BankName = c.String(maxLength: 250),
                        Description = c.String(maxLength: 500),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.BankID);
            
            CreateTable(
                "dbo.BankTransfer",
                c => new
                    {
                        VoucherID = c.Guid(nullable: false),
                        VoucherType = c.Int(),
                        VoucherDate = c.DateTime(storeType: "date"),
                        TotalAmountOC = c.Decimal(storeType: "money"),
                        TotalAmount = c.Decimal(storeType: "money"),
                        AccountID = c.Guid(),
                    })
                .PrimaryKey(t => t.VoucherID);
            
            CreateTable(
                "dbo.BankTransferDetail",
                c => new
                    {
                        VoucherDetailID = c.Guid(nullable: false),
                        VoucherID = c.Guid(nullable: false),
                        FromBankAccount = c.String(maxLength: 50),
                        ToBankAccount = c.String(maxLength: 100),
                        FromBankName = c.String(maxLength: 255),
                        ToBankName = c.String(maxLength: 255),
                        AmountOC = c.Decimal(storeType: "money"),
                        Amount = c.Decimal(storeType: "money"),
                        Description = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.VoucherDetailID)
                .ForeignKey("dbo.BankTransfer", t => t.VoucherID, cascadeDelete: true)
                .Index(t => t.VoucherID);
            
            CreateTable(
                "dbo.Branch",
                c => new
                    {
                        BranchID = c.Guid(nullable: false),
                        BranchCode = c.String(maxLength: 50),
                        BranchName = c.String(maxLength: 250),
                        Address = c.String(maxLength: 250),
                        TelephoneNumber = c.String(maxLength: 15, unicode: false),
                        Email = c.String(maxLength: 100, unicode: false),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.BranchID);
            
            CreateTable(
                "dbo.Stock",
                c => new
                    {
                        StockID = c.Guid(nullable: false),
                        StockName = c.String(maxLength: 150),
                        StockCode = c.String(maxLength: 150, unicode: false),
                        Desription = c.String(maxLength: 500),
                        Status = c.Boolean(),
                        BranchID = c.Guid(),
                    })
                .PrimaryKey(t => t.StockID)
                .ForeignKey("dbo.Branch", t => t.BranchID)
                .Index(t => t.BranchID);
            
            CreateTable(
                "dbo.Errors",
                c => new
                    {
                        ErrorID = c.Guid(nullable: false),
                        Message = c.String(),
                        StackTrace = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ErrorID);
            
            CreateTable(
                "dbo.InvoiceType",
                c => new
                    {
                        InvoiceTypeID = c.Guid(nullable: false),
                        InvoiceTypeCode = c.String(nullable: false, maxLength: 25),
                        ParentID = c.Guid(),
                        InvoiceTypeName = c.String(nullable: false, maxLength: 255),
                        Inactive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.InvoiceTypeID);
            
            CreateTable(
                "dbo.PublicInvoiceTypeDetail",
                c => new
                    {
                        PublicInvoiceTypeDetailID = c.Guid(nullable: false),
                        PublicInvoiceTypeID = c.Guid(nullable: false),
                        InvoiceTypeID = c.Guid(nullable: false),
                        InvoiceTypeName = c.String(nullable: false, maxLength: 100),
                        InvoiceSeries = c.String(nullable: false, maxLength: 50),
                        FromInvNo = c.String(nullable: false, maxLength: 20),
                        ToInvNo = c.String(nullable: false, maxLength: 20),
                        Quantity = c.Int(nullable: false),
                        UseDate = c.DateTime(nullable: false, storeType: "date"),
                        CompanyPrintedName = c.String(maxLength: 255),
                        CompanyPrintedTax = c.String(maxLength: 50),
                        ContractNo = c.String(maxLength: 50),
                        ContractDate = c.DateTime(storeType: "date"),
                    })
                .PrimaryKey(t => t.PublicInvoiceTypeDetailID)
                .ForeignKey("dbo.PublicInvoiceType", t => t.PublicInvoiceTypeID)
                .ForeignKey("dbo.InvoiceType", t => t.InvoiceTypeID)
                .Index(t => t.PublicInvoiceTypeID)
                .Index(t => t.InvoiceTypeID);
            
            CreateTable(
                "dbo.PublicInvoiceType",
                c => new
                    {
                        PublicInvoiceTypeID = c.Guid(nullable: false),
                        PublicDate = c.DateTime(nullable: false),
                        PublicNo = c.String(nullable: false, maxLength: 50),
                        CompanyTaxName = c.String(maxLength: 255),
                        ContactName = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.PublicInvoiceTypeID);
            
            CreateTable(
                "dbo.Item",
                c => new
                    {
                        ItemID = c.Guid(nullable: false),
                        CreateDate = c.DateTime(),
                        CreateBy = c.String(maxLength: 150),
                        ModifiedDate = c.DateTime(storeType: "date"),
                        ModifiedBy = c.String(maxLength: 150),
                        ItemCategoryID = c.Guid(),
                        Brand = c.String(maxLength: 150),
                        Image = c.String(maxLength: 150),
                        Name = c.String(maxLength: 250),
                        Quantity = c.Int(),
                        Tags = c.String(maxLength: 50),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ItemID);
            
            CreateTable(
                "dbo.ItemOption",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Name = c.String(maxLength: 250),
                        Barcode = c.String(maxLength: 15, unicode: false),
                        SKU = c.String(maxLength: 15, unicode: false),
                        StockID = c.Guid(),
                        Color = c.String(maxLength: 150),
                        Size = c.String(maxLength: 150),
                        CreateDate = c.DateTime(),
                        CreateBy = c.String(maxLength: 150),
                        Unit = c.String(maxLength: 50),
                        Description = c.String(maxLength: 500),
                        Weigh = c.String(maxLength: 10, fixedLength: true),
                        BranchID = c.Guid(),
                        ModifiedDate = c.DateTime(storeType: "date"),
                        ModifiedBy = c.String(maxLength: 150),
                        TaxRate = c.Decimal(precision: 18, scale: 8),
                        Material = c.String(maxLength: 150),
                        SalePrice = c.Decimal(storeType: "money"),
                        PurchasePrice = c.Decimal(storeType: "money"),
                        InitialPrice = c.Decimal(nullable: false, storeType: "money"),
                        WholesalePrice = c.Decimal(storeType: "money"),
                        UnitName = c.String(maxLength: 150),
                        UnitConvertRate = c.String(maxLength: 50),
                        ClosingQuantity = c.Int(nullable: false),
                        ItemID = c.Guid(nullable: false),
                        Image1 = c.String(maxLength: 150),
                        Image2 = c.String(maxLength: 150),
                        Image3 = c.String(maxLength: 150),
                        Image4 = c.String(maxLength: 150),
                        Status = c.Boolean(nullable: false),
                        HomeFlag = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Item", t => t.ItemID, cascadeDelete: true)
                .Index(t => t.ItemID);
            
            CreateTable(
                "dbo.ItemCategory",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Code = c.String(maxLength: 150),
                        ItemCategoryName = c.String(maxLength: 250),
                        ParentId = c.Guid(),
                        Description = c.String(maxLength: 500),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Object",
                c => new
                    {
                        ObjectID = c.Guid(nullable: false),
                        ObjectCode = c.String(maxLength: 50),
                        ObjectName = c.String(maxLength: 255),
                        ObjectCategoryID = c.Guid(),
                        ObjectAddress = c.String(maxLength: 255),
                        Tel = c.String(maxLength: 50),
                        BankAccount = c.String(maxLength: 50),
                        BankName = c.String(maxLength: 255),
                        TaxCode = c.String(maxLength: 50),
                        Email = c.String(maxLength: 50),
                        DiscountRate = c.Decimal(storeType: "money"),
                        BirthdayDate = c.DateTime(),
                        AccumulativePoint = c.Int(),
                        Debt = c.Decimal(storeType: "money"),
                        ObjectKind = c.Int(),
                        Status = c.Boolean(nullable: false),
                        Description = c.String(maxLength: 200),
                        CreateDate = c.DateTime(),
                        CreateBy = c.String(maxLength: 100),
                        ModifyDate = c.DateTime(),
                        ModifyBy = c.String(maxLength: 100),
                        CaringStaff = c.Guid(),
                        Sex = c.String(maxLength: 10, fixedLength: true),
                    })
                .PrimaryKey(t => t.ObjectID);
            
            CreateTable(
                "dbo.ObjectCategory",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(maxLength: 250),
                        Description = c.String(maxLength: 500),
                        NumberObject = c.Int(),
                        Status = c.Boolean(nullable: false),
                        PricePolicyID = c.Guid(),
                        CreateDate = c.DateTime(),
                        CreateBy = c.String(maxLength: 100),
                        ModifyDate = c.DateTime(),
                        ModifyBy = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PricePolicy", t => t.PricePolicyID)
                .Index(t => t.PricePolicyID);
            
            CreateTable(
                "dbo.PricePolicy",
                c => new
                    {
                        PricePolicyID = c.Guid(nullable: false),
                        PricePolicyCode = c.String(maxLength: 50),
                        PricePolicyName = c.String(maxLength: 150),
                        Status = c.Boolean(nullable: false),
                        ApplyFor = c.String(maxLength: 50),
                        Description = c.String(maxLength: 200),
                        CreateDate = c.DateTime(),
                        CreateBy = c.String(maxLength: 100),
                        ModifyDate = c.DateTime(),
                        ModifyBy = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.PricePolicyID);
            
            CreateTable(
                "dbo.ObjectKind",
                c => new
                    {
                        ObjectKindID = c.Int(nullable: false),
                        ObjectKindName = c.String(maxLength: 100),
                        Status = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ObjectKindID);
            
            CreateTable(
                "dbo.PaymentSchedule",
                c => new
                    {
                        PaymentScheduleID = c.Guid(nullable: false),
                        PaymentScheduleName = c.String(maxLength: 100),
                        PayWithin = c.Int(),
                        IsDefault = c.Boolean(),
                        Status = c.Boolean(nullable: false),
                        Description = c.String(maxLength: 200),
                        CreateDate = c.DateTime(),
                        CreateBy = c.String(maxLength: 100),
                        ModifyDate = c.DateTime(),
                        ModifyBy = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.PaymentScheduleID);
            
            CreateTable(
                "dbo.PrintForm",
                c => new
                    {
                        ID = c.Guid(nullable: false),
                        Code = c.String(maxLength: 50),
                        Name = c.String(maxLength: 50),
                        HtmlCode = c.String(maxLength: 4000),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.PurchaseInvoice",
                c => new
                    {
                        VoucherID = c.Guid(nullable: false),
                        INVoucherDate = c.DateTime(storeType: "date"),
                        INVoucherNo = c.String(maxLength: 20),
                        VoucherType = c.Int(nullable: false),
                        InwardStockID = c.Guid(),
                        ObjectID = c.Guid(),
                        ObjectName = c.String(maxLength: 255),
                        ObjectAddress = c.String(maxLength: 255),
                        BranchID = c.Guid(),
                        DeliveryDate = c.DateTime(),
                        INContactName = c.String(maxLength: 255),
                        INJournalMemo = c.String(maxLength: 255),
                        OriginalVoucherNo = c.String(maxLength: 20),
                        CABAVoucherDate = c.DateTime(storeType: "date"),
                        CABAVoucherNo = c.String(maxLength: 20),
                        AccountingObjectBankAccount = c.String(maxLength: 50),
                        AccountingObjectBankName = c.String(maxLength: 255),
                        CABAContactName = c.String(maxLength: 255),
                        BankAccount = c.String(maxLength: 50),
                        BankName = c.String(maxLength: 255),
                        CreditCardNo = c.String(maxLength: 50),
                        BillReceived = c.Boolean(),
                        CurrencyKindID = c.String(maxLength: 3),
                        ExchangeRate = c.Decimal(precision: 22, scale: 8),
                        PaymentTermID = c.Guid(),
                        DueDate = c.DateTime(storeType: "date"),
                        ShippingMethodID = c.Guid(),
                        EmployeeID = c.Guid(),
                        IsImportPurchase = c.Boolean(),
                        SpecialConsumeTax = c.Boolean(),
                        InvoiceExportStatus = c.Boolean(),
                        StockImportStatus = c.Boolean(),
                        PaymentStatus = c.Int(),
                        TotalPurchaseQuantity = c.Int(),
                        TotalAmountOC = c.Decimal(storeType: "money"),
                        TotalAmount = c.Decimal(storeType: "money"),
                        TotalPaymentAmount = c.Decimal(storeType: "money"),
                        TotalImportTaxAmountOC = c.Decimal(storeType: "money"),
                        TotalImportTaxAmount = c.Decimal(storeType: "money"),
                        TotalVATAmountOC = c.Decimal(storeType: "money"),
                        TotalVATAmount = c.Decimal(storeType: "money"),
                        DiscountForInvoice = c.Decimal(storeType: "money"),
                        TotalDiscountAmountOC = c.Decimal(storeType: "money"),
                        TotalDiscountAmount = c.Decimal(storeType: "money"),
                        TotalFreightAmountOC = c.Decimal(storeType: "money"),
                        TotalFreightAmount = c.Decimal(storeType: "money"),
                        TotalOutwardAmountOC = c.Decimal(storeType: "money"),
                        TotalOutwardAmount = c.Decimal(storeType: "money"),
                        ReconciledDate = c.DateTime(storeType: "date"),
                        Reconciled = c.Boolean(),
                        IsPosted = c.Boolean(),
                        LayoutID = c.Guid(),
                        SortOrder = c.Int(),
                        EditVersion = c.Int(),
                        PostVersion = c.Int(),
                        IsAttachList = c.Boolean(),
                        ListCommonNameInventory = c.String(maxLength: 255),
                        IsShowUnitConvert = c.Boolean(),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.String(maxLength: 100),
                        ModifyDate = c.DateTime(),
                        ModifiedBy = c.String(maxLength: 100),
                        TotalImportTaxExpenseAmountOC = c.Decimal(storeType: "money"),
                        TotalImportTaxExpenseAmount = c.Decimal(storeType: "money"),
                        Status = c.Int(),
                    })
                .PrimaryKey(t => t.VoucherID);
            
            CreateTable(
                "dbo.PurchaseInvoiceDetail",
                c => new
                    {
                        VoucherDetailID = c.Guid(nullable: false),
                        VoucherID = c.Guid(),
                        ItemID = c.Guid(),
                        Description = c.String(maxLength: 255),
                        StockID = c.Guid(),
                        DebitAccount = c.String(maxLength: 20),
                        CreditAccount = c.String(maxLength: 20),
                        Unit = c.String(maxLength: 50),
                        UnitConvert = c.String(maxLength: 50),
                        Quantity = c.Int(),
                        QuantityConvert = c.Decimal(precision: 22, scale: 8),
                        UnitPriceOC = c.Decimal(storeType: "money"),
                        UnitPrice = c.Decimal(storeType: "money"),
                        UnitPriceConvertOC = c.Decimal(storeType: "money"),
                        UnitPriceConvert = c.Decimal(storeType: "money"),
                        AmountOC = c.Decimal(storeType: "money"),
                        Amount = c.Decimal(storeType: "money"),
                        DiscountRate = c.Decimal(precision: 22, scale: 8),
                        DiscountAmountOC = c.Decimal(storeType: "money"),
                        DiscountAmount = c.Decimal(storeType: "money"),
                        DiscountAccount = c.String(maxLength: 20),
                        ImportTaxRate = c.Decimal(precision: 22, scale: 8),
                        ImportTaxAmountOC = c.Decimal(storeType: "money"),
                        ImportTaxAmount = c.Decimal(storeType: "money"),
                        ImportTaxAccount = c.String(maxLength: 20),
                        VATRate = c.Decimal(precision: 22, scale: 8),
                        VATAmountOC = c.Decimal(storeType: "money"),
                        VATAmount = c.Decimal(storeType: "money"),
                        VATAccount = c.String(maxLength: 20),
                        InvType = c.Int(),
                        InvDate = c.DateTime(storeType: "date"),
                        InvSeries = c.String(maxLength: 20),
                        InvNo = c.String(maxLength: 20),
                        InventoryAccount = c.String(maxLength: 20),
                        COGAccount = c.String(maxLength: 20),
                        OutwardPriceOC = c.Decimal(storeType: "money"),
                        OutwardPrice = c.Decimal(storeType: "money"),
                        OutwardAmountOC = c.Decimal(storeType: "money"),
                        OutwardAmount = c.Decimal(storeType: "money"),
                        PurchasePurposeID = c.Guid(),
                        DeductionDebitAccount = c.String(maxLength: 20),
                        CustomsUnitPriceOC = c.Decimal(storeType: "money"),
                        CustomsUnitPrice = c.Decimal(storeType: "money"),
                        SpecialConsumeTaxRate = c.Decimal(precision: 22, scale: 8),
                        SpecialConsumeTaxAmount = c.Decimal(storeType: "money"),
                        SpecialConsumeTaxAmountOC = c.Decimal(storeType: "money"),
                        SpecialConsumeTaxAccount = c.String(maxLength: 20),
                        FreightAmountOC = c.Decimal(storeType: "money"),
                        FreightAmount = c.Decimal(storeType: "money"),
                        AccountingObjectID = c.Guid(),
                        ContractID = c.Guid(),
                        StatisticItemID = c.Guid(),
                        DepartmentID = c.Guid(),
                        ExpiryDate = c.DateTime(storeType: "date"),
                        LotNo = c.String(maxLength: 50),
                        VATPaid = c.Boolean(),
                        PaymentVoucherID = c.Guid(),
                        SortOrder = c.Int(),
                        VATPostedDate = c.DateTime(storeType: "date"),
                        CompanyTaxCode = c.String(maxLength: 50),
                        AccountingObjectTaxID = c.Guid(),
                        AccountingObjectTaxName = c.String(maxLength: 255),
                        InvoiceTypeID = c.String(maxLength: 50),
                        ConvertRate = c.Decimal(precision: 22, scale: 8),
                        UnitPriceAfterTaxOC = c.Decimal(storeType: "money"),
                        UnitPriceAfterTax = c.Decimal(storeType: "money"),
                        AmountAfterTaxOC = c.Decimal(storeType: "money"),
                        AmountAfterTax = c.Decimal(storeType: "money"),
                        ImportTaxExpenseAmount = c.Decimal(storeType: "money"),
                        ImportTaxExpenseAmountOC = c.Decimal(storeType: "money"),
                        DiscountAmountAfterTax = c.Decimal(precision: 22, scale: 8),
                        DiscountAmountAfterTaxOC = c.Decimal(precision: 22, scale: 8),
                        UnReasonableCosts = c.Boolean(),
                        OrderVoucherID = c.Guid(),
                        OrderVoucherNo = c.String(maxLength: 25),
                        ExpenseItemID = c.Guid(),
                        JobID = c.Guid(),
                        OutwardPriceConvertOC = c.Decimal(storeType: "money"),
                        OutwardPriceConvert = c.Decimal(storeType: "money"),
                        TransporterID = c.Guid(),
                    })
                .PrimaryKey(t => t.VoucherDetailID);
            
            CreateTable(
                "dbo.Region",
                c => new
                    {
                        RegionID = c.Guid(nullable: false),
                        RegionCode = c.String(nullable: false, maxLength: 255),
                        RegionName = c.String(nullable: false, maxLength: 255),
                        ParentID = c.Guid(),
                        IsParent = c.Boolean(nullable: false),
                        ParentCode = c.String(maxLength: 255),
                        Grade = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RegionID);
            
            CreateTable(
                "dbo.SaleInvoice",
                c => new
                    {
                        VoucherID = c.Guid(nullable: false),
                        VoucherNo = c.String(maxLength: 50),
                        VoucherDate = c.DateTime(storeType: "date"),
                        VoucherType = c.Int(),
                        ObjectID = c.Guid(),
                        CABAVoucherDate = c.DateTime(storeType: "date"),
                        CABAContactName = c.String(maxLength: 255),
                        BankAccount = c.String(maxLength: 50),
                        BankName = c.String(maxLength: 50),
                        BillPaid = c.Boolean(),
                        InvType = c.Int(),
                        InvDate = c.DateTime(storeType: "date"),
                        InvSeries = c.String(maxLength: 20),
                        InvNo = c.String(maxLength: 20),
                        InvJournalMemo = c.String(maxLength: 255),
                        InvContactName = c.String(maxLength: 255),
                        CompanyTaxCode = c.String(maxLength: 50),
                        CurrencyKindID = c.String(maxLength: 3),
                        ExchangeRate = c.Decimal(precision: 22, scale: 8),
                        DueDate = c.DateTime(storeType: "date"),
                        ShippingMethodID = c.Guid(),
                        EmployeeID = c.Guid(),
                        DiscountRate = c.Decimal(nullable: false, precision: 22, scale: 8),
                        DiscountAmountOC = c.Decimal(nullable: false, storeType: "money"),
                        DiscountAmount = c.Decimal(nullable: false, storeType: "money"),
                        TotalAmountOC = c.Decimal(nullable: false, storeType: "money"),
                        TotalAmount = c.Decimal(nullable: false, storeType: "money"),
                        TotalDiscountAmountOC = c.Decimal(nullable: false, storeType: "money"),
                        TotalDiscountAmount = c.Decimal(nullable: false, storeType: "money"),
                        TotalVATAmountOC = c.Decimal(nullable: false, storeType: "money"),
                        TotalVATAmount = c.Decimal(nullable: false, storeType: "money"),
                        TotalOutwardAmount = c.Decimal(nullable: false, storeType: "money"),
                        IsPosted = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        InvoiceForm = c.Int(),
                        InvoiceTypeID = c.Guid(),
                        OutwardVoucherID = c.Guid(),
                        CommisionRate = c.Decimal(precision: 22, scale: 8),
                        CommisionAmountOC = c.Decimal(nullable: false, storeType: "money"),
                        CommisionAmount = c.Decimal(nullable: false, storeType: "money"),
                        ListNo = c.String(maxLength: 20),
                        ListDate = c.DateTime(storeType: "date"),
                        IsAttachList = c.Boolean(nullable: false),
                        IsShowUnitConvert = c.Boolean(nullable: false),
                        CreatedBy = c.String(maxLength: 100),
                        ModifiedBy = c.String(maxLength: 100),
                        StatusID = c.Int(nullable: false),
                        TransporterID = c.Guid(),
                    })
                .PrimaryKey(t => t.VoucherID);
            
            CreateTable(
                "dbo.SaleInvoiceDetail",
                c => new
                    {
                        VoucherDetailID = c.Guid(nullable: false),
                        VoucherID = c.Guid(nullable: false),
                        ItemID = c.Guid(),
                        Description = c.String(maxLength: 255),
                        StockID = c.Guid(),
                        DebitAccount = c.String(maxLength: 20),
                        CreditAccount = c.String(maxLength: 20),
                        Unit = c.String(maxLength: 50),
                        UnitConvert = c.String(maxLength: 50),
                        Quantity = c.Decimal(nullable: false, precision: 22, scale: 8),
                        QuantityConvert = c.Decimal(nullable: false, precision: 22, scale: 8),
                        UnitPriceOC = c.Decimal(nullable: false, storeType: "money"),
                        UnitPrice = c.Decimal(nullable: false, storeType: "money"),
                        UnitPriceConvertOC = c.Decimal(nullable: false, storeType: "money"),
                        UnitPriceConvert = c.Decimal(nullable: false, storeType: "money"),
                        AmountOC = c.Decimal(nullable: false, storeType: "money"),
                        Amount = c.Decimal(nullable: false, storeType: "money"),
                        DiscountRate = c.Decimal(nullable: false, precision: 22, scale: 8),
                        DiscountAmountOC = c.Decimal(nullable: false, storeType: "money"),
                        DiscountAmount = c.Decimal(nullable: false, storeType: "money"),
                        DiscountAccount = c.String(maxLength: 20),
                        VATRate = c.Decimal(nullable: false, precision: 22, scale: 8),
                        VATAmountOC = c.Decimal(nullable: false, storeType: "money"),
                        VATAmount = c.Decimal(nullable: false, storeType: "money"),
                        VATAccount = c.String(maxLength: 20),
                        InventoryAccount = c.String(maxLength: 20),
                        COGAccount = c.String(maxLength: 20),
                        OutwardPrice = c.Decimal(nullable: false, storeType: "money"),
                        OutwardAmount = c.Decimal(nullable: false, storeType: "money"),
                        ConfrontingVoucherID = c.Guid(),
                        ExpiryDate = c.DateTime(storeType: "date"),
                        LotNo = c.String(maxLength: 50),
                        Warranty = c.String(maxLength: 255),
                        AccountingObjectID = c.Guid(),
                        ContractID = c.Guid(),
                        StatisticItemID = c.Guid(),
                        SortOrder = c.Int(),
                        SpecialConsumeTaxRate = c.Decimal(nullable: false, precision: 22, scale: 8),
                        SpecialConsumeTaxAmountOC = c.Decimal(nullable: false, storeType: "money"),
                        SpecialConsumeTaxAmount = c.Decimal(nullable: false, storeType: "money"),
                        SpecialConsumeUnitPriceOC = c.Decimal(nullable: false, storeType: "money"),
                        SpecialConsumeUnitPrice = c.Decimal(nullable: false, storeType: "money"),
                        ConvertRate = c.Decimal(nullable: false, precision: 22, scale: 8),
                        UnitPriceAfterTaxOC = c.Decimal(nullable: false, storeType: "money"),
                        UnitPriceAfterTax = c.Decimal(nullable: false, storeType: "money"),
                        AmountAfterTaxOC = c.Decimal(nullable: false, storeType: "money"),
                        AmountAfterTax = c.Decimal(nullable: false, storeType: "money"),
                        DiscountAmountAfterTax = c.Decimal(nullable: false, precision: 22, scale: 8),
                        DiscountAmountAfterTaxOC = c.Decimal(nullable: false, precision: 22, scale: 8),
                        DepartmentID = c.Guid(),
                        CreditAccountingObjectID = c.Guid(),
                        ConfrontingVoucherDetailID = c.Guid(),
                        ContractVoucherDetailID = c.Guid(),
                        OutwardPurpose = c.Int(),
                        JobID = c.Guid(),
                        ExpenseItemID = c.Guid(),
                        OutwardPriceConvert = c.Decimal(nullable: false, storeType: "money"),
                        PurchasePurposeID = c.Guid(),
                        VATPostedDate = c.DateTime(storeType: "date"),
                        InvType = c.Int(),
                        InvDate = c.DateTime(storeType: "date"),
                        InvSeries = c.String(maxLength: 20),
                        InvNo = c.String(maxLength: 20),
                        CompanyTaxCode = c.String(maxLength: 50),
                        AccountingObjectTaxID = c.Guid(),
                        AccountingObjectTaxName = c.String(maxLength: 255),
                        InvoiceTypeID = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.VoucherDetailID)
                .ForeignKey("dbo.SaleInvoice", t => t.VoucherID, cascadeDelete: true)
                .Index(t => t.VoucherID);
            
            CreateTable(
                "dbo.StockTransfer",
                c => new
                    {
                        VoucherID = c.Guid(nullable: false),
                        VoucherType = c.Int(nullable: false),
                        VoucherDate = c.DateTime(nullable: false),
                        VoucherNo = c.String(nullable: false, maxLength: 20),
                        ObjectID = c.Guid(),
                        ObjectName = c.String(maxLength: 255),
                        ObjectAddress = c.String(maxLength: 255),
                        JournalMemo = c.String(maxLength: 255),
                        InwardStockKeeper = c.String(maxLength: 255),
                        OutwardStockKeeper = c.String(maxLength: 255),
                        TotalAmount = c.Decimal(nullable: false, storeType: "money"),
                        IsPosted = c.Boolean(nullable: false),
                        PostVersion = c.Int(),
                        EditVersion = c.Int(),
                        SortOrder = c.Int(nullable: false),
                        IsExport = c.Boolean(),
                        InvoiceTypeID = c.Guid(),
                        InvSeries = c.String(maxLength: 20),
                        ContractNo = c.String(maxLength: 50),
                        Transport = c.String(maxLength: 255),
                        MobilizationNo = c.String(maxLength: 255),
                        MobilizationDate = c.DateTime(),
                        MobilizationOf = c.String(maxLength: 255),
                        MobilizationFor = c.String(maxLength: 255),
                        CreatedBy = c.String(maxLength: 100),
                        ModifiedBy = c.String(maxLength: 100),
                    })
                .PrimaryKey(t => t.VoucherID);
            
            CreateTable(
                "dbo.StockTransferDetail",
                c => new
                    {
                        VoucherDetailID = c.Guid(nullable: false),
                        VoucherID = c.Guid(nullable: false),
                        ItemID = c.Guid(nullable: false),
                        Description = c.String(maxLength: 255),
                        FromStockID = c.Guid(nullable: false),
                        ToStockID = c.Guid(nullable: false),
                        ConfrontingVoucherID = c.Guid(),
                        EmployeeID = c.Guid(nullable: false),
                        ObjectID = c.Guid(nullable: false),
                        StatisticItemID = c.Guid(nullable: false),
                        SortOrder = c.Int(),
                        UnitConvert = c.String(maxLength: 20),
                        ConvertRate = c.Decimal(precision: 22, scale: 8),
                        ExpiryDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.VoucherDetailID)
                .ForeignKey("dbo.StockTransfer", t => t.VoucherID)
                .Index(t => t.VoucherID);
            
            CreateTable(
                "dbo.StoreInfo",
                c => new
                    {
                        Version = c.String(nullable: false, maxLength: 150),
                        CreateDate = c.DateTime(storeType: "date"),
                        DomainName = c.String(maxLength: 50, unicode: false),
                        Desription = c.String(maxLength: 250),
                        Status = c.Boolean(),
                    })
                .PrimaryKey(t => t.Version);
            
            CreateTable(
                "dbo.SYSAuditingLog",
                c => new
                    {
                        SYSAuditingLogID = c.Guid(nullable: false),
                        UserName = c.String(maxLength: 50),
                        FunctionName = c.String(maxLength: 100),
                        ActionName = c.String(maxLength: 50),
                        Desciption = c.String(maxLength: 255),
                        CreateDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.SYSAuditingLogID);
            
            CreateTable(
                "dbo.Transporter",
                c => new
                    {
                        TransporterID = c.Guid(nullable: false),
                        TransporterCode = c.String(maxLength: 50),
                        TransporterName = c.String(maxLength: 255),
                        Description = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.TransporterID);
            
            CreateTable(
                "dbo.Unit",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ItemOptionID = c.Guid(nullable: false),
                        Name = c.String(maxLength: 150),
                        UnitConvertRate = c.String(maxLength: 50),
                        Status = c.Boolean(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.VoucherCheck",
                c => new
                    {
                        VoucherID = c.Guid(nullable: false),
                        VoucherCode = c.String(maxLength: 20),
                        VoucherType = c.Int(),
                        ObjectID = c.Guid(),
                        BranchID = c.Guid(),
                        VoucherDate = c.DateTime(),
                        Tags = c.String(maxLength: 50, unicode: false),
                        Note = c.String(maxLength: 250),
                        TotalAfterCheck = c.Int(),
                        TotalDifference = c.Int(),
                        CreateDate = c.DateTime(),
                        CreateBy = c.String(maxLength: 50),
                        ModifyDate = c.DateTime(),
                        ModifyBy = c.String(maxLength: 50),
                        Status = c.Boolean(),
                        Description = c.String(maxLength: 250),
                        EndUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.VoucherID);
            
            CreateTable(
                "dbo.VoucherCheckDetail",
                c => new
                    {
                        VoucherCheckDetailID = c.Guid(nullable: false),
                        VoucherCheckID = c.Guid(),
                        ItemID = c.Guid(),
                        InStock = c.Int(),
                        AfterCheck = c.Int(),
                        Reason = c.String(maxLength: 150),
                        Result = c.Int(),
                    })
                .PrimaryKey(t => t.VoucherCheckDetailID);
            
            CreateTable(
                "dbo.VoucherType",
                c => new
                    {
                        VoucherType = c.Int(nullable: false),
                        VoucherName = c.String(maxLength: 250),
                        Status = c.String(maxLength: 10, fixedLength: true),
                    })
                .PrimaryKey(t => t.VoucherType);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StockTransferDetail", "VoucherID", "dbo.StockTransfer");
            DropForeignKey("dbo.SaleInvoiceDetail", "VoucherID", "dbo.SaleInvoice");
            DropForeignKey("dbo.ObjectCategory", "PricePolicyID", "dbo.PricePolicy");
            DropForeignKey("dbo.ItemOption", "ItemID", "dbo.Item");
            DropForeignKey("dbo.PublicInvoiceTypeDetail", "InvoiceTypeID", "dbo.InvoiceType");
            DropForeignKey("dbo.PublicInvoiceTypeDetail", "PublicInvoiceTypeID", "dbo.PublicInvoiceType");
            DropForeignKey("dbo.Stock", "BranchID", "dbo.Branch");
            DropForeignKey("dbo.BankTransferDetail", "VoucherID", "dbo.BankTransfer");
            DropIndex("dbo.StockTransferDetail", new[] { "VoucherID" });
            DropIndex("dbo.SaleInvoiceDetail", new[] { "VoucherID" });
            DropIndex("dbo.ObjectCategory", new[] { "PricePolicyID" });
            DropIndex("dbo.ItemOption", new[] { "ItemID" });
            DropIndex("dbo.PublicInvoiceTypeDetail", new[] { "InvoiceTypeID" });
            DropIndex("dbo.PublicInvoiceTypeDetail", new[] { "PublicInvoiceTypeID" });
            DropIndex("dbo.Stock", new[] { "BranchID" });
            DropIndex("dbo.BankTransferDetail", new[] { "VoucherID" });
            DropTable("dbo.VoucherType");
            DropTable("dbo.VoucherCheckDetail");
            DropTable("dbo.VoucherCheck");
            DropTable("dbo.Unit");
            DropTable("dbo.Transporter");
            DropTable("dbo.SYSAuditingLog");
            DropTable("dbo.StoreInfo");
            DropTable("dbo.StockTransferDetail");
            DropTable("dbo.StockTransfer");
            DropTable("dbo.SaleInvoiceDetail");
            DropTable("dbo.SaleInvoice");
            DropTable("dbo.Region");
            DropTable("dbo.PurchaseInvoiceDetail");
            DropTable("dbo.PurchaseInvoice");
            DropTable("dbo.PrintForm");
            DropTable("dbo.PaymentSchedule");
            DropTable("dbo.ObjectKind");
            DropTable("dbo.PricePolicy");
            DropTable("dbo.ObjectCategory");
            DropTable("dbo.Object");
            DropTable("dbo.ItemCategory");
            DropTable("dbo.ItemOption");
            DropTable("dbo.Item");
            DropTable("dbo.PublicInvoiceType");
            DropTable("dbo.PublicInvoiceTypeDetail");
            DropTable("dbo.InvoiceType");
            DropTable("dbo.Errors");
            DropTable("dbo.Stock");
            DropTable("dbo.Branch");
            DropTable("dbo.BankTransferDetail");
            DropTable("dbo.BankTransfer");
            DropTable("dbo.Bank");
        }
    }
}
