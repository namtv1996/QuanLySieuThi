namespace G9VN.TIKTAK.Data.Infrastructure
{
    public interface IUnitOfWork
    {
        void Commit();
        void CommitSYS();
    }
}