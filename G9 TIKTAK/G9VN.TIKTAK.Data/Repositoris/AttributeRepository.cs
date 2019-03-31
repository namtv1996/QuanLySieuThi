using G9VN.TIKTAK.Data.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G9VN.TIKTAK.Model;
using G9VN.TIKTAK.Model.Models;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public interface IAttributeRepository : IRepository<Model.Models.Attribute>
    {
        //lấy ds
        IEnumerable<G9VN.TIKTAK.Model.Models.Attribute> getAll();
        //tim kiem theo ten
        IEnumerable<G9VN.TIKTAK.Model.Models.Attribute> search(string key);
        //thêm mới thuộc tính vào trong csdl
        void add(G9VN.TIKTAK.Model.Models.Attribute attr);
        //get by name
        G9VN.TIKTAK.Model.Models.Attribute getByName(string key);
    }
    public class AttributeRepository : RepositoryBase<Model.Models.Attribute>, IAttributeRepository
    {
        public AttributeRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public void add(G9VN.TIKTAK.Model.Models.Attribute attr)
        {
            this.DbContext.AttriBute.Add(attr);
        }

        public virtual IEnumerable<G9VN.TIKTAK.Model.Models.Attribute> getAll()
        {
            return this.DbContext.AttriBute.ToList();
        }

        public Model.Models.Attribute getByName(string key)
        {
            return this.DbContext.AttriBute.Where(x => x.Name == key).SingleOrDefault();
        }

        public virtual IEnumerable<G9VN.TIKTAK.Model.Models.Attribute> search(string key)
        {           
            return this.DbContext.AttriBute.Where(x => x.Name.Contains(key));
        }
    }
   
}
