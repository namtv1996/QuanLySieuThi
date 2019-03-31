using AutoMapper;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.SYSTEM.Models;
using G9VN.TIKTAK.Web.Models;

namespace G9VN.TIKTAK.Web.Mappings
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(cfg =>
            {
                //partner
                cfg.CreateMap<Partner, PartnerViewModel>().MaxDepth(2);
                //item
                cfg.CreateMap<ItemCategory, ItemCategoryViewModel>().MaxDepth(2);
                cfg.CreateMap<Item, ItemViewModel>().MaxDepth(2);
                cfg.CreateMap<ItemOption, ItemOptionViewModel>().MaxDepth(2);
                //salespromotion
                cfg.CreateMap<SalesPromotion, SalesPromotionViewModel>().MaxDepth(2);
                cfg.CreateMap<SalesPromotionDetail, SalesPromotionDetailViewModel>().MaxDepth(2);
                //object
                cfg.CreateMap<Object1, ObjectViewModel>().MaxDepth(2);
                cfg.CreateMap<ObjectCategory, ObjectCategoryViewModel>().MaxDepth(2);
                cfg.CreateMap<ObjectKind, ObjectKindViewModel>().MaxDepth(2);
                //stocktransfer
                cfg.CreateMap<StockTransfer, ItemTransferViewModel>().MaxDepth(2);
                cfg.CreateMap<StockTransferDetail, ItemTransferDetailViewModel>().MaxDepth(2);
                //Branch
                cfg.CreateMap<Branch, BranchViewModel>().MaxDepth(2);
                //printcode
                cfg.CreateMap<PrintForm, PrintFormViewModel>().MaxDepth(2);

                //PricePolicy
                cfg.CreateMap<PricePolicy, PricePolicyViewModel>().MaxDepth(2);

                //PaymentSchedule
                cfg.CreateMap<PaymentSchedule, PaymentScheduleViewModel>().MaxDepth(2);

                //SaleInvoice
                cfg.CreateMap<SaleInvoice, SaleInvoiceViewModel>().MaxDepth(2);
                cfg.CreateMap<SaleInvoiceDetail, SaleInvoiceDetailViewModel>().MaxDepth(2);

                //VoucherCheck
                cfg.CreateMap<VoucherCheck, VoucherCheckViewModel>().MaxDepth(2);
                cfg.CreateMap<VoucherCheckDetail, VoucherCheckDetailViewModel>().MaxDepth(2);

                //PurchaseInvoice - InwardStock
                cfg.CreateMap<PurchaseInvoice, PurchaseInvoiceViewModel>().MaxDepth(2);
                cfg.CreateMap<PurchaseInvoiceDetail, PurchaseInvoiceDetailViewModel>().MaxDepth(2);

                //ManageStore
                cfg.CreateMap<ManageStore, ManageStoreViewModel>().MaxDepth(2);
                cfg.CreateMap<ConfigurationStore, ConfigurationStoreViewModel>().MaxDepth(2);
                cfg.CreateMap<Notifications, NotificationsViewModel>().MaxDepth(2);

                //region
                cfg.CreateMap<Region, RegionViewModel>().MaxDepth(2);
                //user role
                cfg.CreateMap<ApplicationGroup, ApplicationGroupViewModel>();
                cfg.CreateMap<ApplicationRole, ApplicationRoleViewModel>();
                cfg.CreateMap<ApplicationUser, ApplicationUserViewModel>();
                //attribute
                cfg.CreateMap<Attribute, AttributeViewModel>().MaxDepth(2);
                cfg.CreateMap<AttributeDetail, AttributeDetailViewModel>().MaxDepth(2);

                //stock
                cfg.CreateMap<Stock, StockViewModel>().MaxDepth(2);
                //combo
                cfg.CreateMap<ComboDetail, ComboViewModel>().MaxDepth(2);

              

            });
        }
    }
}