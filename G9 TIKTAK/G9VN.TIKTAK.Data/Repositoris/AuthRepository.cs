using G9VN.TIKTAK.SYSTEM.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Data.Repositoris
{
    public class AuthRepository : IDisposable
    {
        private TIKTAK_SYSTEM_DbContext dataContext;
        private UserManager<ApplicationUser> _userManager;

        public AuthRepository()
        {
            dataContext = new TIKTAK_SYSTEM_DbContext();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(dataContext));
        }

        public ManageStore GetStoreByUserName(string userName)
        {
            var id = this.dataContext.Set<ApplicationUser>().Where<ApplicationUser>(x => x.UserName == userName).Single().ManageStoreID;
            return this.dataContext.Set<ManageStore>().Where<ManageStore>(x => x.ManageStoreID == id).Single();
        }
        public void UpdateVersion(ManageStore store)
        {
            this.dataContext.Set<ManageStore>().Attach(store);
            this.dataContext.Entry(store).State = EntityState.Modified;
            this.dataContext.SaveChanges();
        }
        public async Task<ApplicationUser> FindUser(string userName, string password)
        {
            ApplicationUser user = await _userManager.FindAsync(userName, password);

            return user;
        }
        public Client FindClient(string clientId)
        {
            var client = dataContext.Clients.Find(clientId);

            return client;
        }

        public async Task<bool> AddRefreshToken(RefreshToken token)

        {
            try { 
            var existingToken = dataContext.RefreshTokens.Where(r => r.Subject == token.Subject).SingleOrDefault();
                if (existingToken != null)
                {
                    var result = await RemoveRefreshToken(existingToken.Id);
                }

                dataContext.RefreshTokens.Add(token);

               
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return await dataContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = await dataContext.RefreshTokens.FindAsync(refreshTokenId);

            if (refreshToken != null)
            {
                dataContext.RefreshTokens.Remove(refreshToken);
                return await dataContext.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshToken(RefreshToken refreshToken)
        {
            dataContext.RefreshTokens.Remove(refreshToken);
            return await dataContext.SaveChangesAsync() > 0;
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await dataContext.RefreshTokens.FindAsync(refreshTokenId);

            return refreshToken;
        }

        public List<RefreshToken> GetAllRefreshTokens()
        {
            return dataContext.RefreshTokens.ToList();
        }

        public void Dispose()
        {
            dataContext.Dispose();
        }
    }
}