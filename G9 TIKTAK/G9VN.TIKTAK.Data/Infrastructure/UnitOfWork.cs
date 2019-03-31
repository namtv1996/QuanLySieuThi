using System;
using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.SYSTEM.Models;

namespace G9VN.TIKTAK.Data.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbFactory dbFactory;
        private TIKTAKDbContext dbContext;
        private TIKTAK_SYSTEM_DbContext db;

        public UnitOfWork(IDbFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }

        public TIKTAKDbContext DbContext
        {
            get { return dbContext ?? (dbContext = dbFactory.Init()); }
        }
        public TIKTAK_SYSTEM_DbContext Db
        {
            get { return db ?? (db = dbFactory.InitSYS()); }
        }

        public void Commit()
        {
            DbContext.SaveChanges();
        }

        public void CommitSYS()
        {
            Db.SaveChanges();
        }
    }
}