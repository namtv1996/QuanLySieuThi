using G9VN.TIKTAK.Model.Models;
using G9VN.TIKTAK.SYSTEM.Models;
using System;

namespace G9VN.TIKTAK.Data.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        TIKTAKDbContext Init();
        TIKTAK_SYSTEM_DbContext InitSYS();
    }
}