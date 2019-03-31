using G9VN.TIKTAK.Common;
using G9VN.TIKTAK.Data.Infrastructure;
using G9VN.TIKTAK.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IAttributeDetailRepository :IRepository<AttributeDetail>
    {
        IEnumerable<AttributeDetail> getByItemOptionID(Guid id);
        IEnumerable<AttributeViewModel> getListAttribute(Guid id);
        void deleteAttributeDetail(Guid id);
    };
    public class AttributeDetailRepository : RepositoryBase<AttributeDetail>, IAttributeDetailRepository
    {
        public AttributeDetailRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
        //xóa tất cả các thuộc tính của tùy chọn hàng hóa
        public void deleteAttributeDetail(Guid id)
        {
            var parameters = new SqlParameter[] { new SqlParameter("@id", id) };
            this.DbContext.Database.ExecuteSqlCommand("SP_delete_AttributeDetail_ByItemOptionID @id", parameters);
        }

        public IEnumerable<AttributeDetail> getByItemOptionID(Guid id)
        {
            return this.DbContext.AttriButeDetail.Where(x => x.ItemOptionID == id).ToList();
        }

        public IEnumerable<AttributeViewModel> getListAttribute(Guid id)
        {
            var parameters = new SqlParameter[]{new SqlParameter("@id",id) };
            return this.DbContext.Database.SqlQuery<AttributeViewModel>("SP_getListAttributeByItemOptionID @id", parameters).ToList();
        }

    }
}
