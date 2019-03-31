using System;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.SYSTEM.Models;

namespace G9VN.TIKTAK.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        private TIKTAKDbContext dbContext;
        private TIKTAK_SYSTEM_DbContext db;

        public TIKTAKDbContext Init()
        {
            return dbContext ?? (dbContext = new TIKTAKDbContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
            {
                dbContext.Dispose();
            }
            if(db != null)
            {
                db.Dispose();
            }
                
        }

        public TIKTAK_SYSTEM_DbContext InitSYS()
        {
            return db ?? (db = new TIKTAK_SYSTEM_DbContext());
        }
    }
}