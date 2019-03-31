namespace G9VN.TIKTAK.SYSTEM.Models
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.Data.Entity;

    public partial class TIKTAK_SYSTEM_DbContext : IdentityDbContext<ApplicationUser>
    {
        public TIKTAK_SYSTEM_DbContext()
            : base("name=TIKTAK_SYSTEM_DbContext")
        {
        }

        public virtual DbSet<ManageStore> ManageStore { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<ApplicationGroup> ApplicationGroups { set; get; }
        public DbSet<ApplicationRole> ApplicationRoles { set; get; }
        public DbSet<ApplicationRoleGroup> ApplicationRoleGroups { set; get; }
        public DbSet<ApplicationUserGroup> ApplicationUserGroups { set; get; }
        public virtual DbSet<ConfigurationStore> ConfigurationStore { get; set; }
        public virtual DbSet<Notifications> Notifications { get; set; }
        public static TIKTAK_SYSTEM_DbContext Create()
        {
            return new TIKTAK_SYSTEM_DbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUserRole>()
                .HasKey(i => new { i.UserId, i.RoleId }).ToTable("ApplicationUserRoles");
            modelBuilder.Entity<IdentityUserLogin>()
                .HasKey(i => i.UserId).ToTable("ApplicationUserLogins");
            modelBuilder.Entity<IdentityRole>().ToTable("ApplicationRoles");
            modelBuilder.Entity<IdentityUserClaim>().HasKey(i => i.UserId).ToTable("ApplicationUserClaims");
        }
    }
}