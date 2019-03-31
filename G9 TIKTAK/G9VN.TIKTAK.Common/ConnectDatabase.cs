using System.Configuration;
using System.Data;
using System.Reflection;

namespace G9VN.TIKTAK.Common
{
    public class ConnectDatabase
    {
        #region Declare

        //public static string ConnectionStringName = "DbContext_" + System.Web.HttpContext.Current.User.Identity.Name;
        public static string m_ServerName = "103.7.43.182\\TIKTAC,1444";

        public static string m_DBUser = "sa";
        public static string m_DBPassword = "G9TiktacVN";
        public static bool m_WindowsAuthentication = false;
        public static Microsoft.SqlServer.Management.Smo.Server m_Server;
        

        #endregion Declare

        public static void ConnectServer()
        {
            m_Server = new Microsoft.SqlServer.Management.Smo.Server(m_ServerName);
            if (m_WindowsAuthentication)
            {
                m_Server.ConnectionContext.LoginSecure = true;
            }
            else
            {
                m_Server.ConnectionContext.LoginSecure = false;
                m_Server.ConnectionContext.Login = m_DBUser;
                m_Server.ConnectionContext.Password = m_DBPassword;
            }
            m_Server.ConnectionContext.ConnectTimeout = 600;
            m_Server.ConnectionContext.ServerInstance = m_ServerName;
            m_Server.ConnectionContext.Connect();
        }

        public static void DisconnectServer()
        {
            m_Server = new Microsoft.SqlServer.Management.Smo.Server();
            if (m_WindowsAuthentication)
            {
                m_Server.ConnectionContext.LoginSecure = true;
            }
            else
            {
                m_Server.ConnectionContext.LoginSecure = false;
                m_Server.ConnectionContext.Login = m_DBUser;
                m_Server.ConnectionContext.Password = m_DBPassword;
            }
            m_Server.ConnectionContext.ServerInstance = m_ServerName;
            m_Server.ConnectionContext.Disconnect();
        }

        public static void AddConnectionString(string sDBName, string sName)
        {
            System.Data.SqlClient.SqlConnectionStringBuilder oBuilder = new System.Data.SqlClient.SqlConnectionStringBuilder();
            System.Configuration.Configuration oConfig = null;
            if (System.Web.HttpContext.Current != null && !System.Web.HttpContext.Current.Request.PhysicalPath.Equals(string.Empty))
            {
                oConfig = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~");
            }
            else
            {
                oConfig = ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
            }
            System.Configuration.ConnectionStringsSection oSession = oConfig.ConnectionStrings;
            string stringConnection = @"data source=103.7.43.182\TIKTAC,1444;initial catalog=" + sDBName + ";integrated security=False;User ID=sa;Password=G9TiktacVN;Connection Timeout=600;MultipleActiveResultSets=True;App=EntityFramework";
            ConnectionStringSettings oConnSetting = null;
            oConnSetting = new ConnectionStringSettings(sName, stringConnection);
            oConnSetting.ProviderName = "System.Data.SqlClient";
            oSession.ConnectionStrings.Add(oConnSetting);
            oConfig.Save();
            ConfigurationManager.RefreshSection("connectionStrings");
        }

        public static DataTable LoadBackupFile(string fileName)
        {
            DataTable dt = new DataTable();
            DataTable dtResult = new DataTable();
            DataColumn oColumn = new DataColumn();
            DataRow oRow = default(DataRow);
            Microsoft.SqlServer.Management.Smo.Restore oRestore = new Microsoft.SqlServer.Management.Smo.Restore();

            oColumn.ColumnName = "Name";
            oColumn.DataType = System.Type.GetType("System.String");
            dt.Columns.Add(oColumn);
            oColumn = new DataColumn();
            oColumn.ColumnName = "Date";
            oColumn.DataType = System.Type.GetType("System.String");
            dt.Columns.Add(oColumn);
            oColumn = new DataColumn();
            oColumn.ColumnName = "FileNumber";
            oColumn.DataType = System.Type.GetType("System.Int32");
            dt.Columns.Add(oColumn);

            oRestore.Devices.AddDevice(fileName, Microsoft.SqlServer.Management.Smo.DeviceType.File);
            dtResult = oRestore.ReadBackupHeader(m_Server);
            foreach (DataRow dr in dtResult.Rows)
            {
                oRow = dt.NewRow();
                oRow["Name"] = dr["DatabaseName"];
                oRow["Date"] = dr["BackupFinishDate"];
                oRow["FileNumber"] = dr["Position"];
                dt.Rows.Add(oRow);
            }
            return dt;
        }

        public static bool RestoreDatabase(string databaseName, string fileName, int fileNumber, string Path)
        {
            Microsoft.SqlServer.Management.Smo.Restore oRestore = new Microsoft.SqlServer.Management.Smo.Restore();
            bool bResult = false;
            if (Path.Length > 0)
            {
                DataTable dt = new DataTable();
                oRestore.Database = databaseName;
                oRestore.Action = Microsoft.SqlServer.Management.Smo.RestoreActionType.Database;
                oRestore.ReplaceDatabase = true;
                oRestore.Devices.AddDevice(fileName, Microsoft.SqlServer.Management.Smo.DeviceType.File);
                oRestore.FileNumber = fileNumber;
                oRestore.PercentCompleteNotification = 10;
                dt = oRestore.ReadFileList(m_Server);
                DataRow[] dr = dt.Select();
                string dbfile = (string)(dr[0]["LogicalName"]);
                string logfile = (string)(dr[1]["LogicalName"]);
                string snewdbfileName = Path + "\\" + databaseName + ".smd";
                string snewlogfileName = Path + "\\" + databaseName + "_log.sld";
                oRestore.RelocateFiles.Add(new Microsoft.SqlServer.Management.Smo.RelocateFile(dbfile, snewdbfileName));
                oRestore.RelocateFiles.Add(new Microsoft.SqlServer.Management.Smo.RelocateFile(logfile, snewlogfileName));
                oRestore.SqlRestore(m_Server);
                bResult = true;
            }
            return bResult;
        }

        public static void RunSQLCommandText(string SqlCommandText, string databaseName)
        {
            Microsoft.SqlServer.Management.Smo.Database db = m_Server.Databases[databaseName];
            db.ExecuteNonQuery(SqlCommandText);
        }
    }
}