using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.SYSTEM.Models;
using G9VN.TIKTAK.Web.Models;
using System;

namespace G9VN.TIKTAK.Web.Infrastructure.Extensions
{
    public static class EntityExtensisons
    {
        public static void UpdatePartner(this Partner p, PartnerViewModel pvm)
        {
            p.ID = pvm.ID;
            p.Status = pvm.Status;
            p.PartnerName = pvm.PartnerName;
            p.NameSignIn = pvm.NameSignIn;
            p.StoreName = pvm.StoreName;
            p.PassSignIn = pvm.PassSignIn;
            p.BankID = pvm.BankID;
    }
        public static void UpdateManageStore(this ManageStore store, ManageStoreViewModel storeViewModel)
        {
            store.ManageStoreID = storeViewModel.ManageStoreID;
            store.Address = storeViewModel.Address;
            store.CreateDate = storeViewModel.CreateDate;
            store.Expirydate = storeViewModel.Expirydate;
            store.StoreName = storeViewModel.StoreName;
            store.Business = storeViewModel.Business;
            store.Logo = storeViewModel.Logo;
            store.Server = storeViewModel.Server;
        }
        public static void UpdateApplicationGroup(this ApplicationGroup appGroup, ApplicationGroupViewModel appGroupViewModel)
        {
            appGroup.ID = appGroupViewModel.ID;
            appGroup.Name = appGroupViewModel.Name;
            appGroup.Description = appGroupViewModel.Description;
        }

        public static void UpdateApplicationRole(this ApplicationRole appRole, ApplicationRoleViewModel appRoleViewModel, string action = "add")
        {
            if (action == "update")
                appRole.Id = appRoleViewModel.Id;
            else
                appRole.Id = Guid.NewGuid().ToString();
            appRole.Name = appRoleViewModel.Name;
            appRole.Description = appRoleViewModel.Description;
            appRole.type = appRoleViewModel.type;
        }
        public static void UpdateUser(this ApplicationUser appUser, ApplicationUserViewModel appUserViewModel, string action = "add")
        {

            appUser.Id = appUserViewModel.Id;
            appUser.FullName = appUserViewModel.FullName;
            appUser.Address = appUserViewModel.Address;
            appUser.BirthDay = appUserViewModel.BirthDay;
            appUser.Email = appUserViewModel.Email;
            appUser.UserName = appUserViewModel.UserName;
            appUser.PhoneNumber = appUserViewModel.PhoneNumber;
            appUser.BranchID = appUserViewModel.BranchID;
            appUser.Avatar = appUserViewModel.Avatar;
        }

        public static void UpdateConfigStore(this ConfigurationStore cfg, ConfigurationStoreViewModel cfgVm)
        {
            cfg.ConfigurationStoreID = cfgVm.ConfigurationStoreID;
            cfg.ManageStoreID = cfgVm.ManageStoreID;
            cfg.StoreName = cfgVm.StoreName;
            cfg.SalePricePolicyDefault = cfgVm.SalePricePolicyDefault;
            cfg.PurchasePricePolicyDefault = cfgVm.PurchasePricePolicyDefault;
            cfg.SaleTaxDefault = cfgVm.SaleTaxDefault;
            cfg.PurchaseTaxDefault = cfgVm.PurchaseTaxDefault;
            cfg.PaymentScheduleDefault = cfgVm.PaymentScheduleDefault;
            cfg.PaymentMethodDefault = cfgVm.PaymentMethodDefault;

        }

        public static void UpdateItemCategory(this ItemCategory itemCategory, ItemCategoryViewModel itemCategoryVm)
        {
            itemCategory.Id = itemCategoryVm.Id;
            itemCategory.Code = itemCategoryVm.Code;
            itemCategory.ItemCategoryName = itemCategoryVm.ItemCategoryName;
            itemCategory.ParentId = itemCategoryVm.ParentId;
            itemCategory.Description = itemCategoryVm.Description;
            itemCategory.Status = itemCategoryVm.Status;
        }

        public static void UpdateItem(this Item item, ItemViewModel itemVm)
        {
            item.ItemID = itemVm.ItemID;
            item.Name = itemVm.Name;
            item.Status = itemVm.Status;
            item.Tags = itemVm.Tags;
            item.CreateBy = itemVm.CreateBy;
            item.CreateDate = itemVm.CreateDate;
            item.ModifiedBy = itemVm.ModifiedBy;
            item.ModifiedDate = itemVm.ModifiedDate;
            item.Brand = itemVm.Brand;
            item.ItemCategoryID = itemVm.ItemCategoryID;
            item.Image = itemVm.Image;
            item.Quantity = itemVm.Quantity;
            item.Unit = itemVm.Unit;
        }

        public static void UpdateItemOption(this ItemOption itemOption, ItemOptionViewModel itemOptionVm)
        {
            itemOption.ID = itemOptionVm.ID;
            itemOption.Name = itemOptionVm.Name;
            itemOption.InitialPrice = itemOptionVm.InitialPrice;
            itemOption.ClosingQuantity = itemOptionVm.ClosingQuantity;
            itemOption.WholesalePrice = itemOptionVm.WholesalePrice;
            itemOption.Color = itemOptionVm.Color;
            itemOption.Size = itemOptionVm.Size;
            itemOption.Material = itemOptionVm.Material;
            itemOption.SalePrice = itemOptionVm.SalePrice;
            itemOption.PurchasePrice = itemOptionVm.PurchasePrice;
            itemOption.ItemID = itemOptionVm.ItemID;
            itemOption.Image1 = itemOptionVm.Image1;
            itemOption.Image2 = itemOptionVm.Image2;
            itemOption.Image3 = itemOptionVm.Image3;
            itemOption.Image4 = itemOptionVm.Image4;
            itemOption.Status = itemOptionVm.Status;
            itemOption.SKU = itemOptionVm.SKU;
            itemOption.Barcode = itemOptionVm.Barcode;
            itemOption.CreateDate = itemOptionVm.CreateDate;
            itemOption.CreateBy = itemOptionVm.CreateBy;
            itemOption.Weigh = itemOptionVm.Weigh;
            itemOption.BranchID = itemOptionVm.BranchID;
            itemOption.StockID = itemOptionVm.StockID;
            itemOption.ModifiedDate = itemOptionVm.ModifiedDate;
            itemOption.ModifiedBy = itemOptionVm.ModifiedBy;
            itemOption.TaxRate = itemOptionVm.TaxRate;
            itemOption.HomeFlag = itemOptionVm.HomeFlag;
            itemOption.Description = itemOptionVm.Description;
            itemOption.UnitName = itemOptionVm.UnitName;
            itemOption.UnitConvertRate = itemOptionVm.UnitConvertRate;
            itemOption.MinimumInventory = itemOptionVm.MinimumInventory;
            itemOption.MaximumInventory = itemOptionVm.MaximumInventory;
            itemOption.NotificationInventory = itemOptionVm.NotificationInventory;
        }
        //store
        public static void UpdateStore(this ManageStore obj, ManageStoreViewModel listNameStoreVm)
        {
            obj.ManageStoreID = listNameStoreVm.ManageStoreID;
            obj.Address = listNameStoreVm.Address;
            obj.CreateDate = listNameStoreVm.CreateDate;
            obj.Expirydate = listNameStoreVm.Expirydate;
            obj.StoreName = listNameStoreVm.StoreName;
            obj.Business = listNameStoreVm.Business;
        }
        public static void UpdateSalesPromotion(this SalesPromotion obj, SalesPromotionViewModel listSalesPromotionVM)
        {
            obj.VoucherID = listSalesPromotionVM.VoucherID;
            obj.PromotionName = listSalesPromotionVM.PromotionName;
            obj.VoucherType = listSalesPromotionVM.VoucherType;
            obj.VoucherNo = listSalesPromotionVM.VoucherNo;
            obj.VoucherDate = listSalesPromotionVM.VoucherDate;
            obj.ApplyQuantity = listSalesPromotionVM.ApplyQuantity;
            obj.Description = listSalesPromotionVM.Description;
            obj.CreateDate = listSalesPromotionVM.CreateDate;
            obj.Expirydate = listSalesPromotionVM.Expirydate;
            obj.Object = listSalesPromotionVM.Object;
            obj.Status = listSalesPromotionVM.Status;
            obj.BranchID = listSalesPromotionVM.BranchID;
        }
        public static void UpdateSalesPromotionDetail(this SalesPromotionDetail obj, SalesPromotionDetailViewModel listSalesPromotionVM)
        {
            obj.VoucherDetailID = listSalesPromotionVM.VoucherDetailID;
            obj.VoucherID = listSalesPromotionVM.VoucherID;
            obj.ItemID = listSalesPromotionVM.ItemID;
            obj.VoucherType = listSalesPromotionVM.VoucherType;
            obj.QuantityItem = listSalesPromotionVM.QuantityItem;
            obj.LimitPromotion = listSalesPromotionVM.LimitPromotion;
            obj.ConditionsMax = listSalesPromotionVM.ConditionsMax;
            obj.ConditionsMin = listSalesPromotionVM.ConditionsMin;
            obj.PromotionValue = listSalesPromotionVM.PromotionValue;
            obj.PromotionType = listSalesPromotionVM.PromotionType;
        }
        //object
        public static void UpdateObject(this Object1 obj, ObjectViewModel objectVm)
        {
            obj.ObjectID = objectVm.ObjectID;
            obj.ObjectCode = objectVm.ObjectCode;
            obj.ObjectName = objectVm.ObjectName;
            obj.ObjectAddress = objectVm.ObjectAddress;
            obj.Tel = objectVm.Tel;
            obj.Email = objectVm.Email;
            obj.ObjectCategoryID = objectVm.ObjectCategoryID;
            obj.ObjectKind = objectVm.ObjectKind;
            obj.ObjectState = objectVm.ObjectState;
            obj.ObjectDistrict = objectVm.ObjectDistrict;
            obj.ObjectWard = objectVm.ObjectWard;
            obj.Debt = objectVm.Debt;
            obj.DiscountRate = objectVm.DiscountRate;
            obj.BirthdayDate = objectVm.BirthdayDate;
            obj.BankAccount = objectVm.BankAccount;
            obj.BankName = objectVm.BankName;
            obj.TaxCode = objectVm.TaxCode;
            obj.AccumulativePoint = objectVm.AccumulativePoint;
            obj.Status = objectVm.Status;
            obj.Description = objectVm.Description;
            obj.CreateDate = objectVm.CreateDate;
            obj.CreateBy = objectVm.CreateBy;
            obj.ModifyDate = objectVm.ModifyDate;
            obj.ModifyBy = objectVm.ModifyBy;
            obj.CaringStaff = objectVm.CaringStaff;
            obj.Sex = objectVm.Sex;
            obj.ApplyIncentives = objectVm.ApplyIncentives;
            obj.PricePolicyDefault = objectVm.PricePolicyDefault;
            obj.TaxRateDefault = objectVm.TaxRateDefault;
            obj.DiscountRateDefault = objectVm.DiscountRateDefault;
            obj.PaymentMethodDefault = objectVm.PaymentMethodDefault;
            obj.PaymentScheduleDefault = objectVm.PaymentScheduleDefault;

        }

        public static void UpdateObjectCategory(this ObjectCategory objCategory, ObjectCategoryViewModel objCategoryVm)
        {
            objCategory.Id = objCategoryVm.Id;
            objCategory.Name = objCategoryVm.Name;
            objCategory.Description = objCategoryVm.Description;
            objCategory.NumberObject = objCategoryVm.NumberObject;
            objCategory.Status = objCategoryVm.Status;
            objCategory.CreateDate = objCategoryVm.CreateDate;
            objCategory.CreateBy = objCategoryVm.CreateBy;
            objCategory.ModifyDate = objCategoryVm.ModifyDate;
            objCategory.ModifyBy = objCategoryVm.ModifyBy;
            objCategory.ObjectKind = objCategoryVm.ObjectKind;
            objCategory.PricePolicyDefault = objCategoryVm.PricePolicyDefault;
            objCategory.TaxRateDefault = objCategoryVm.TaxRateDefault;
            objCategory.DiscountRateDefault = objCategoryVm.DiscountRateDefault;
            objCategory.PaymentMethodDefault = objCategoryVm.PaymentMethodDefault;
            objCategory.PaymentScheduleDefault = objCategoryVm.PaymentScheduleDefault;
        }

        //PricePolicy
        public static void UpdatePricePolicy(this PricePolicy pp, PricePolicyViewModel ppViewModel)
        {
            pp.PricePolicyID = ppViewModel.PricePolicyID;
            pp.PricePolicyCode = ppViewModel.PricePolicyCode;
            pp.PricePolicyName = ppViewModel.PricePolicyName;
            pp.Status = ppViewModel.Status;
            pp.ApplyFor = ppViewModel.ApplyFor;
            pp.Description = ppViewModel.Description;
            pp.CreateDate = ppViewModel.CreateDate;
            pp.CreateBy = ppViewModel.CreateBy;
            pp.ModifyDate = ppViewModel.ModifyDate;
            pp.ModifyBy = ppViewModel.ModifyBy;
        }

        //branch
        public static void UpdateBranch(this Branch branch, BranchViewModel branchvm)
        {
            branch.BranchID = Guid.NewGuid();
            branch.BranchCode = branchvm.BranchCode;
            branch.BranchName = branchvm.BranchName;
            branch.Address = branchvm.Address;
            branch.TelephoneNumber = branchvm.TelephoneNumber;
            branch.Email = branchvm.Email;
            branch.Status = true;
        }

        //PaymentSchedule
        public static void UpdatePaymentSchedule(this PaymentSchedule ps, PaymentScheduleViewModel psvm)
        {
            ps.PaymentScheduleID = psvm.PaymentScheduleID;
            ps.PaymentScheduleName = psvm.PaymentScheduleName;
            ps.PayWithin = psvm.PayWithin;
            ps.IsDefault = psvm.IsDefault;
            ps.Status = psvm.Status;
            ps.Description = psvm.Description;
            ps.CreateDate = psvm.CreateDate;
            ps.CreateBy = psvm.CreateBy;
            ps.ModifyDate = psvm.ModifyDate;
            ps.ModifyBy = psvm.ModifyBy;
        }
        public static void UpdateSaleInvoice(this SaleInvoice saleInvoice, SaleInvoiceViewModel saleInvoiceVM)
        {
            saleInvoice.VoucherID = saleInvoiceVM.VoucherID;
            saleInvoice.PromotionID = saleInvoiceVM.PromotionID;
            saleInvoice.VoucherDate = saleInvoiceVM.VoucherDate;
            saleInvoice.VoucherType = saleInvoiceVM.VoucherType;
            saleInvoice.ObjectID = saleInvoiceVM.ObjectID;
            saleInvoice.ObjectName = saleInvoiceVM.ObjectName;
            saleInvoice.ObjectAddress = saleInvoiceVM.ObjectAddress;
            saleInvoice.ObjectTel = saleInvoiceVM.ObjectTel;
            saleInvoice.CABAVoucherDate = saleInvoiceVM.CABAVoucherDate;
            saleInvoice.CABAContactName = saleInvoiceVM.CABAContactName;
            saleInvoice.BankAccount = saleInvoiceVM.BankAccount;
            saleInvoice.BankName = saleInvoiceVM.BankName;
            saleInvoice.BillPaid = saleInvoiceVM.BillPaid;
            saleInvoice.InvType = saleInvoiceVM.InvType;
            saleInvoice.InvDate = saleInvoiceVM.InvDate;
            saleInvoice.InvSeries = saleInvoiceVM.InvSeries;
            saleInvoice.InvNo = saleInvoiceVM.InvNo;
            saleInvoice.InvJournalMemo = saleInvoiceVM.InvJournalMemo;
            saleInvoice.InvContactName = saleInvoiceVM.InvContactName;
            saleInvoice.CompanyTaxCode = saleInvoiceVM.CompanyTaxCode;
            saleInvoice.CurrencyKindID = saleInvoiceVM.CurrencyKindID;
            saleInvoice.ExchangeRate = saleInvoiceVM.ExchangeRate;
            saleInvoice.DueDate = saleInvoiceVM.DueDate;
            saleInvoice.ShippingMethodID = saleInvoiceVM.ShippingMethodID;
            saleInvoice.Employee = saleInvoiceVM.Employee;
            saleInvoice.TotalAmountOC = saleInvoiceVM.TotalAmountOC;
            saleInvoice.TotalAmount = saleInvoiceVM.TotalAmount;
            saleInvoice.TotalDiscountAmountOC = saleInvoiceVM.TotalDiscountAmountOC;
            saleInvoice.TotalDiscountAmount = saleInvoiceVM.TotalDiscountAmount;
            saleInvoice.TotalVATAmountOC = saleInvoiceVM.TotalVATAmountOC;
            saleInvoice.TotalVATAmount = saleInvoiceVM.TotalVATAmount;
            saleInvoice.ShippingAmount = saleInvoiceVM.ShippingAmount;
            saleInvoice.TotalOutwardAmount = saleInvoiceVM.TotalOutwardAmount;
            saleInvoice.IsPosted = saleInvoiceVM.IsPosted;
            saleInvoice.SortOrder = saleInvoiceVM.SortOrder;
            saleInvoice.InvoiceForm = saleInvoiceVM.InvoiceForm;
            saleInvoice.InvoiceTypeID = saleInvoiceVM.InvoiceTypeID;
            saleInvoice.OutwardVoucherID = saleInvoiceVM.OutwardVoucherID;
            saleInvoice.CommisionRate = saleInvoiceVM.CommisionRate;
            saleInvoice.CommisionAmountOC = saleInvoiceVM.CommisionAmountOC;
            saleInvoice.CommisionAmount = saleInvoiceVM.CommisionAmount;
            saleInvoice.ListNo = saleInvoiceVM.ListNo;
            saleInvoice.ListDate = saleInvoiceVM.ListDate;
            saleInvoice.IsAttachList = saleInvoiceVM.IsAttachList;
            saleInvoice.IsShowUnitConvert = saleInvoiceVM.IsShowUnitConvert;
            saleInvoice.CreatedBy = saleInvoiceVM.CreatedBy;
            saleInvoice.ModifiedBy = saleInvoiceVM.ModifiedBy;
            saleInvoice.StatusID = saleInvoiceVM.StatusID;
            saleInvoice.DiscountRate = saleInvoiceVM.DiscountRate;
            saleInvoice.DiscountAmountOC = saleInvoiceVM.DiscountAmountOC;
            saleInvoice.DiscountAmount = saleInvoiceVM.DiscountAmount;
            saleInvoice.VoucherNo = saleInvoiceVM.VoucherNo;
            saleInvoice.OriginalVoucherNo = saleInvoiceVM.OriginalVoucherNo;
            saleInvoice.BranchID = saleInvoiceVM.BranchID;
            saleInvoice.Description = saleInvoiceVM.Description;
            saleInvoice.TransporterID = saleInvoiceVM.TransporterID;
            saleInvoice.Debt = saleInvoiceVM.Debt;
        }
        public static void UpdateSaleInvoiceDetail(this SaleInvoiceDetail saleInvoiceDetail, SaleInvoiceDetailViewModel saleInvoiceDetailVM)
        {
            saleInvoiceDetail.VoucherDetailID = saleInvoiceDetailVM.VoucherDetailID;

            saleInvoiceDetail.VoucherID = saleInvoiceDetailVM.VoucherID;

            saleInvoiceDetail.ItemID = saleInvoiceDetailVM.ItemID;

            saleInvoiceDetail.Description = saleInvoiceDetailVM.Description;

            saleInvoiceDetail.StockID = saleInvoiceDetailVM.StockID;

            saleInvoiceDetail.DebitAccount = saleInvoiceDetailVM.DebitAccount;

            saleInvoiceDetail.CreditAccount = saleInvoiceDetailVM.CreditAccount;

            saleInvoiceDetail.Unit = saleInvoiceDetailVM.Unit;

            saleInvoiceDetail.UnitConvert = saleInvoiceDetailVM.UnitConvert;

            saleInvoiceDetail.Quantity = saleInvoiceDetailVM.Quantity;

            saleInvoiceDetail.QuantityConvert = saleInvoiceDetailVM.QuantityConvert;

            saleInvoiceDetail.UnitPriceOC = saleInvoiceDetailVM.UnitPriceOC;

            saleInvoiceDetail.UnitPrice = saleInvoiceDetailVM.UnitPrice;

            saleInvoiceDetail.UnitPriceConvertOC = saleInvoiceDetailVM.UnitPriceConvertOC;

            saleInvoiceDetail.UnitPriceConvert = saleInvoiceDetailVM.UnitPriceConvert;

            saleInvoiceDetail.AmountOC = saleInvoiceDetailVM.AmountOC;

            saleInvoiceDetail.Amount = saleInvoiceDetailVM.Amount;

            saleInvoiceDetail.DiscountRate = saleInvoiceDetailVM.DiscountRate;

            saleInvoiceDetail.DiscountAmountOC = saleInvoiceDetailVM.DiscountAmountOC;

            saleInvoiceDetail.DiscountAmount = saleInvoiceDetailVM.DiscountAmount;
            saleInvoiceDetail.DiscountReason = saleInvoiceDetailVM.DiscountReason;

            saleInvoiceDetail.DiscountAccount = saleInvoiceDetailVM.DiscountAccount;

            saleInvoiceDetail.VATRate = saleInvoiceDetailVM.VATRate;

            saleInvoiceDetail.VATAmountOC = saleInvoiceDetailVM.VATAmountOC;

            saleInvoiceDetail.VATAmount = saleInvoiceDetailVM.VATAmount;

            saleInvoiceDetail.VATAccount = saleInvoiceDetailVM.VATAccount;

            saleInvoiceDetail.InventoryAccount = saleInvoiceDetailVM.InventoryAccount;

            saleInvoiceDetail.COGAccount = saleInvoiceDetailVM.COGAccount;

            saleInvoiceDetail.OutwardPrice = saleInvoiceDetailVM.OutwardPrice;

            saleInvoiceDetail.OutwardAmount = saleInvoiceDetailVM.OutwardAmount;

            saleInvoiceDetail.ConfrontingVoucherID = saleInvoiceDetailVM.ConfrontingVoucherID;

            saleInvoiceDetail.ExpiryDate = saleInvoiceDetailVM.ExpiryDate;

            saleInvoiceDetail.LotNo = saleInvoiceDetailVM.LotNo;

            saleInvoiceDetail.Warranty = saleInvoiceDetailVM.Warranty;

            saleInvoiceDetail.AccountingObjectID = saleInvoiceDetailVM.AccountingObjectID;

            saleInvoiceDetail.ContractID = saleInvoiceDetailVM.ContractID;

            saleInvoiceDetail.StatisticItemID = saleInvoiceDetailVM.StatisticItemID;

            saleInvoiceDetail.SortOrder = saleInvoiceDetailVM.SortOrder;

            saleInvoiceDetail.SpecialConsumeTaxRate = saleInvoiceDetailVM.SpecialConsumeTaxRate;

            saleInvoiceDetail.SpecialConsumeTaxAmountOC = saleInvoiceDetailVM.SpecialConsumeTaxAmountOC;

            saleInvoiceDetail.SpecialConsumeTaxAmount = saleInvoiceDetailVM.SpecialConsumeTaxAmount;

            saleInvoiceDetail.SpecialConsumeUnitPriceOC = saleInvoiceDetailVM.SpecialConsumeUnitPriceOC;

            saleInvoiceDetail.SpecialConsumeUnitPrice = saleInvoiceDetailVM.SpecialConsumeUnitPrice;

            saleInvoiceDetail.ConvertRate = saleInvoiceDetailVM.ConvertRate;

            saleInvoiceDetail.UnitPriceAfterTaxOC = saleInvoiceDetailVM.UnitPriceAfterTaxOC;

            saleInvoiceDetail.UnitPriceAfterTax = saleInvoiceDetailVM.UnitPriceAfterTax;

            saleInvoiceDetail.AmountAfterTaxOC = saleInvoiceDetailVM.AmountAfterTaxOC;

            saleInvoiceDetail.AmountAfterTax = saleInvoiceDetailVM.AmountAfterTax;

            saleInvoiceDetail.DiscountAmountAfterTax = saleInvoiceDetailVM.DiscountAmountAfterTax;

            saleInvoiceDetail.DiscountAmountAfterTaxOC = saleInvoiceDetailVM.DiscountAmountAfterTaxOC;

            saleInvoiceDetail.DepartmentID = saleInvoiceDetailVM.DepartmentID;

            saleInvoiceDetail.CreditAccountingObjectID = saleInvoiceDetailVM.CreditAccountingObjectID;

            saleInvoiceDetail.ConfrontingVoucherDetailID = saleInvoiceDetailVM.ConfrontingVoucherDetailID;

            saleInvoiceDetail.ContractVoucherDetailID = saleInvoiceDetailVM.ContractVoucherDetailID;

            saleInvoiceDetail.OutwardPurpose = saleInvoiceDetailVM.OutwardPurpose;

            saleInvoiceDetail.JobID = saleInvoiceDetailVM.JobID;

            saleInvoiceDetail.ExpenseItemID = saleInvoiceDetailVM.ExpenseItemID;

            saleInvoiceDetail.OutwardPriceConvert = saleInvoiceDetailVM.OutwardPriceConvert;

            saleInvoiceDetail.PurchasePurposeID = saleInvoiceDetailVM.PurchasePurposeID;

            saleInvoiceDetail.VATPostedDate = saleInvoiceDetailVM.VATPostedDate;

            saleInvoiceDetail.InvType = saleInvoiceDetailVM.InvType;

            saleInvoiceDetail.InvDate = saleInvoiceDetailVM.InvDate;

            saleInvoiceDetail.InvSeries = saleInvoiceDetailVM.InvSeries;

            saleInvoiceDetail.InvNo = saleInvoiceDetailVM.InvNo;

            saleInvoiceDetail.CompanyTaxCode = saleInvoiceDetailVM.CompanyTaxCode;

            saleInvoiceDetail.AccountingObjectTaxID = saleInvoiceDetailVM.AccountingObjectTaxID;

            saleInvoiceDetail.AccountingObjectTaxName = saleInvoiceDetailVM.AccountingObjectTaxName;

            saleInvoiceDetail.InvoiceTypeID = saleInvoiceDetailVM.InvoiceTypeID;
        }

        //VoucherCheck
        public static void UpdateVoucherCheck(this VoucherCheck vc, VoucherCheckViewModel vcvm)
        {
            vc.VoucherID = vcvm.VoucherID;
            vc.VoucherCode = vcvm.VoucherCode;
            vc.VoucherType = vcvm.VoucherType;
            vc.ObjectID = vcvm.ObjectID;
            vc.BranchID = vcvm.BranchID;

            vc.VoucherDate = vcvm.VoucherDate;
            vc.Tags = vcvm.Tags;
            vc.Note = vcvm.Note;
            vc.TotalAfterCheck = vcvm.TotalAfterCheck;
            vc.TotalDifference = vcvm.TotalDifference;
            vc.CreateDate = vcvm.CreateDate;
            vc.CreateBy = vcvm.CreateBy;
            vc.ModifyDate = vcvm.ModifyDate;
            vc.ModifyBy = vcvm.ModifyBy;
            vc.Status = vcvm.Status;
            vc.Description = vcvm.Description;
            vc.EndUpdate = vcvm.EndUpdate;
        }

        public static void UpdateVoucherCheckDetail(this VoucherCheckDetail vcDetail, VoucherCheckDetailViewModel vcvmDetail)
        {
            vcDetail.VoucherCheckDetailID = vcvmDetail.VoucherCheckDetailID;
            vcDetail.VoucherID = vcvmDetail.VoucherID;
            vcDetail.ItemID = vcvmDetail.ItemID;
            vcDetail.InStock = vcvmDetail.InStock;
            vcDetail.AfterCheck = vcvmDetail.AfterCheck;
            vcDetail.Reason = vcvmDetail.Reason;
            vcDetail.Result = vcvmDetail.Result;
        }
        //combo
        public static void UpdateComBo(this ComboDetail std, ComboViewModel stdVm)
        {
            std.ID = stdVm.ID;
            std.ComboID = stdVm.ComboID;
            std.ItemID = stdVm.ItemID;
            std.TransferPrice = stdVm.TransferPrice;
            std.QuantityItem = stdVm.QuantityItem;
            std.TotalAmount = stdVm.TotalAmount;

        }
        //itemtransferdetail
        public static void UpdateItemTransferDetail(this StockTransferDetail std, ItemTransferDetailViewModel stdVm)
        {
            std.VoucherID = stdVm.VoucherID;
            std.VoucherDetailID = stdVm.VoucherDetailID;
            std.ItemID = stdVm.ItemID;
            std.ConfrontingVoucherID = stdVm.ConfrontingVoucherID;
            std.QuantityItem = stdVm.QuantityItem;
            std.ConversionPrice = stdVm.ConversionPrice;
            std.StatisticItemID = stdVm.StatisticItemID;
            std.SortOrder = stdVm.SortOrder;
            std.UnitConvert = stdVm.UnitConvert;
            std.ConvertRate = stdVm.ConvertRate;
        }
        //itemTransfer
        public static void UpdateItemTransfer(this StockTransfer st, ItemTransferViewModel stVm)
        {
            st.VoucherID = stVm.VoucherID;
            st.VoucherType = stVm.VoucherType;
            st.VoucherDate = stVm.VoucherDate;
            st.ObjectID = stVm.ObjectID;
            st.ObjectName = stVm.ObjectName;
            st.ObjectAddress = stVm.ObjectAddress;
            st.JournalMemo = stVm.JournalMemo;
            st.InwardStockKeeper = stVm.InwardStockKeeper;
            st.OutwardStockKeeper = stVm.OutwardStockKeeper;
            st.TotalAmount = stVm.TotalAmount;
            st.IsPosted = stVm.IsPosted;
            st.PostVersion = stVm.PostVersion;
            st.SortOrder = stVm.SortOrder;
            st.IsExport = stVm.IsExport;
            st.InvoiceTypeID = stVm.InvoiceTypeID;
            st.InvSeries = stVm.InvSeries;
            st.ContractNo = stVm.ContractNo;
            st.Transport = stVm.Transport;
            st.MobilizationNo = stVm.MobilizationNo;
            st.MobilizationDate = stVm.MobilizationDate;
            st.MobilizationOf = stVm.MobilizationOf;
            st.MobilizationFor = stVm.MobilizationFor;
            st.CreatedBy = stVm.CreatedBy;
            st.ModifiedBy = stVm.ModifiedBy;
            st.Status = stVm.Status;
            st.BranchID = stVm.BranchID;
            st.Reference = stVm.Reference;
            st.FromStockID = stVm.FromStockID;
            st.ToStockID = stVm.ToStockID;
            st.Description = stVm.Description;



        }
        //PurchaseInvoice
        public static void UpdatePurchaseInvoice(this PurchaseInvoice pur, PurchaseInvoiceViewModel purVm)
        {
            pur.VoucherID = purVm.VoucherID;
            pur.INVoucherDate = purVm.INVoucherDate;
            pur.INVoucherNo = purVm.INVoucherNo;
            pur.VoucherType = purVm.VoucherType;
            pur.InwardStockID = purVm.InwardStockID;
            pur.ObjectID = purVm.ObjectID;
            pur.ObjectName = purVm.ObjectName;
            pur.ObjectAddress = purVm.ObjectAddress;
            pur.BranchID = purVm.BranchID;
            pur.DeliveryDate = purVm.DeliveryDate;
            pur.INContactName = purVm.INContactName;
            pur.INJournalMemo = purVm.INJournalMemo;
            pur.OriginalVoucherNo = purVm.OriginalVoucherNo;
            pur.CABAVoucherDate = purVm.CABAVoucherDate;
            pur.CABAVoucherNo = purVm.CABAVoucherNo;
            pur.AccountingObjectBankAccount = purVm.AccountingObjectBankAccount;
            pur.AccountingObjectBankName = purVm.AccountingObjectBankName;
            pur.CABAContactName = purVm.CABAContactName;
            pur.BankAccount = purVm.BankAccount;
            pur.BankName = purVm.BankName;
            pur.CreditCardNo = purVm.CreditCardNo;
            pur.BillReceived = purVm.BillReceived;
            pur.CurrencyKindID = purVm.CurrencyKindID;
            pur.ExchangeRate = purVm.ExchangeRate;
            pur.PaymentTermID = purVm.PaymentTermID;
            pur.DueDate = purVm.DueDate;
            pur.ShippingMethodID = purVm.ShippingMethodID;
            pur.EmployeeID = purVm.EmployeeID;
            pur.IsImportPurchase = purVm.IsImportPurchase;
            pur.SpecialConsumeTax = purVm.SpecialConsumeTax;
            pur.InvoiceExportStatus = purVm.InvoiceExportStatus;
            pur.StockImportStatus = purVm.StockImportStatus;
            pur.PaymentStatus = purVm.PaymentStatus;
            pur.TotalPurchaseQuantity = purVm.TotalPurchaseQuantity;
            pur.TotalAmountOC = purVm.TotalAmountOC;
            pur.TotalAmount = purVm.TotalAmount;
            pur.TotalPaymentAmount = purVm.TotalPaymentAmount;
            pur.TotalImportTaxAmountOC = purVm.TotalImportTaxAmountOC;
            pur.TotalImportTaxAmount = purVm.TotalImportTaxAmount;
            pur.TotalVATAmountOC = purVm.TotalVATAmountOC;
            pur.TotalVATAmount = purVm.TotalVATAmount;
            pur.TotalDiscountAmountOC = purVm.TotalDiscountAmountOC;
            pur.TotalDiscountAmount = purVm.TotalDiscountAmount;
            pur.DiscountForInvoice = purVm.DiscountForInvoice;
            pur.TotalFreightAmountOC = purVm.TotalFreightAmountOC;
            pur.TotalFreightAmount = purVm.TotalFreightAmount;
            pur.TotalOutwardAmountOC = purVm.TotalOutwardAmountOC;
            pur.TotalOutwardAmount = purVm.TotalOutwardAmount;
            pur.ReconciledDate = purVm.ReconciledDate;
            pur.Reconciled = purVm.Reconciled;
            pur.IsPosted = purVm.IsPosted;
            pur.LayoutID = purVm.LayoutID;
            pur.SortOrder = purVm.SortOrder;
            pur.EditVersion = purVm.EditVersion;
            pur.PostVersion = purVm.PostVersion;
            pur.IsAttachList = purVm.IsAttachList;
            pur.ListCommonNameInventory = purVm.ListCommonNameInventory;
            pur.IsShowUnitConvert = purVm.IsShowUnitConvert;
            pur.CreatedDate = purVm.CreatedDate;
            pur.CreatedBy = purVm.CreatedBy;
            pur.ModifyDate = purVm.ModifyDate;
            pur.ModifiedBy = purVm.ModifiedBy;
            pur.TotalImportTaxExpenseAmountOC = purVm.TotalImportTaxExpenseAmountOC;
            pur.TotalImportTaxExpenseAmount = purVm.TotalImportTaxExpenseAmount;
            pur.Status = purVm.Status;
            pur.Description = purVm.Description;
        }

        public static void UpdatePurchaseInvoiceDetail(this PurchaseInvoiceDetail purDetail, PurchaseInvoiceDetailViewModel purDetailVm)
        {
            purDetail.VoucherDetailID = purDetailVm.VoucherDetailID;
            purDetail.VoucherID = purDetailVm.VoucherID;
            purDetail.ItemID = purDetailVm.ItemID;
            purDetail.Description = purDetailVm.Description;
            purDetail.StockID = purDetailVm.StockID;
            purDetail.DebitAccount = purDetailVm.DebitAccount;
            purDetail.CreditAccount = purDetailVm.CreditAccount;
            purDetail.Unit = purDetailVm.Unit;
            purDetail.UnitConvert = purDetailVm.UnitConvert;
            purDetail.Quantity = purDetailVm.Quantity;
            purDetail.QuantityConvert = purDetailVm.QuantityConvert;
            purDetail.UnitPriceOC = purDetailVm.UnitPriceOC;
            purDetail.UnitPrice = purDetailVm.UnitPrice;
            purDetail.UnitPriceConvertOC = purDetailVm.UnitPriceConvertOC;
            purDetail.UnitPriceConvert = purDetailVm.UnitPriceConvert;
            purDetail.AmountOC = purDetailVm.AmountOC;
            purDetail.Amount = purDetailVm.Amount;
            purDetail.DiscountRate = purDetailVm.DiscountRate;
            purDetail.DiscountAmountOC = purDetailVm.DiscountAmountOC;
            purDetail.DiscountAmount = purDetailVm.DiscountAmount;
            purDetail.DiscountReason = purDetailVm.DiscountReason;
            purDetail.DiscountAccount = purDetailVm.DiscountAccount;
            purDetail.ImportTaxRate = purDetailVm.ImportTaxRate;
            purDetail.ImportTaxAmountOC = purDetailVm.ImportTaxAmountOC;
            purDetail.ImportTaxAmount = purDetailVm.ImportTaxAmount;
            purDetail.ImportTaxAccount = purDetailVm.ImportTaxAccount;
            purDetail.VATRate = purDetailVm.VATRate;
            purDetail.VATAmountOC = purDetailVm.VATAmountOC;
            purDetail.VATAmount = purDetailVm.VATAmount;
            purDetail.VATAccount = purDetailVm.VATAccount;
            purDetail.InvType = purDetailVm.InvType;
            purDetail.InvDate = purDetailVm.InvDate;
            purDetail.InvSeries = purDetailVm.InvSeries;
            purDetail.InvNo = purDetailVm.InvNo;
            purDetail.InventoryAccount = purDetailVm.InventoryAccount;
            purDetail.COGAccount = purDetailVm.COGAccount;
            purDetail.OutwardPriceOC = purDetailVm.OutwardPriceOC;
            purDetail.OutwardPrice = purDetailVm.OutwardPrice;
            purDetail.OutwardAmountOC = purDetailVm.OutwardAmountOC;
            purDetail.OutwardAmount = purDetailVm.OutwardAmount;
            purDetail.PurchasePurposeID = purDetailVm.PurchasePurposeID;
            purDetail.DeductionDebitAccount = purDetailVm.DeductionDebitAccount;
            purDetail.CustomsUnitPriceOC = purDetailVm.CustomsUnitPriceOC;
            purDetail.CustomsUnitPrice = purDetailVm.CustomsUnitPrice;
            purDetail.SpecialConsumeTaxRate = purDetailVm.SpecialConsumeTaxRate;
            purDetail.SpecialConsumeTaxAmountOC = purDetailVm.SpecialConsumeTaxAmountOC;
            purDetail.SpecialConsumeTaxAmount = purDetailVm.SpecialConsumeTaxAmount;
            purDetail.SpecialConsumeTaxAccount = purDetailVm.SpecialConsumeTaxAccount;
            purDetail.FreightAmountOC = purDetailVm.FreightAmountOC;
            purDetail.FreightAmount = purDetailVm.FreightAmount;
            purDetail.AccountingObjectID = purDetailVm.AccountingObjectID;
            purDetail.ContractID = purDetailVm.ContractID;
            purDetail.StatisticItemID = purDetailVm.StatisticItemID;
            purDetail.DepartmentID = purDetailVm.DepartmentID;
            purDetail.ExpiryDate = purDetailVm.ExpiryDate;
            purDetail.LotNo = purDetailVm.LotNo;
            purDetail.VATPaid = purDetailVm.VATPaid;
            purDetail.PaymentVoucherID = purDetailVm.PaymentVoucherID;
            purDetail.SortOrder = purDetailVm.SortOrder;
            purDetail.VATPostedDate = purDetailVm.VATPostedDate;
            purDetail.CompanyTaxCode = purDetailVm.CompanyTaxCode;
            purDetail.AccountingObjectTaxID = purDetailVm.AccountingObjectTaxID;
            purDetail.AccountingObjectTaxName = purDetailVm.AccountingObjectTaxName;
            purDetail.InvoiceTypeID = purDetailVm.InvoiceTypeID;
            purDetail.ConvertRate = purDetailVm.ConvertRate;
            purDetail.UnitPriceAfterTaxOC = purDetailVm.UnitPriceAfterTaxOC;
            purDetail.UnitPriceAfterTax = purDetailVm.UnitPriceAfterTax;
            purDetail.AmountAfterTaxOC = purDetailVm.AmountAfterTaxOC;
            purDetail.AmountAfterTax = purDetailVm.AmountAfterTax;
            purDetail.ImportTaxExpenseAmountOC = purDetailVm.ImportTaxExpenseAmountOC;
            purDetail.ImportTaxExpenseAmount = purDetailVm.ImportTaxExpenseAmount;
            purDetail.DiscountAmountAfterTax = purDetailVm.DiscountAmountAfterTax;
            purDetail.DiscountAmountAfterTaxOC = purDetailVm.DiscountAmountAfterTaxOC;
            purDetail.UnReasonableCosts = purDetailVm.UnReasonableCosts;
            purDetail.OrderVoucherID = purDetailVm.OrderVoucherID;
            purDetail.OrderVoucherNo = purDetailVm.OrderVoucherNo;
            purDetail.ExpenseItemID = purDetailVm.ExpenseItemID;
            purDetail.JobID = purDetailVm.JobID;
            purDetail.OutwardPriceConvertOC = purDetailVm.OutwardPriceConvertOC;
            purDetail.OutwardPriceConvert = purDetailVm.OutwardPriceConvert;
            purDetail.TransporterID = purDetailVm.TransporterID;
        }
        public static void UpdateAttribute(this G9VN.TIKTAK.Model.Models.Attribute attribute, AttributeViewModel attributeVm)
        {
            attribute.Name = attributeVm.Name;
            attribute.Status = attributeVm.Status;
        }
    }
}