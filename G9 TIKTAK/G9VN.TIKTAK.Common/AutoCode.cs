using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G9VN.TIKTAK.Common
{
    public class AutoCode
    {
        public static string MaTuSinh(string prefix,string code)
        {
            if (code == "")
            {
                
                return prefix + "00001";
            }
            string result="";
            string x = "";
            for(int i = prefix.Length; i < code.Length; i++)
            {
                x = x + code[i];
            }
            int ma = int.Parse(x)+1;
            if (ma < 10)
            {
                result = prefix + "0000" + ma;
            }
            else if (ma >= 10 && ma < 100)
            {
                result = prefix + "000" + ma;
            }
            else if (ma >= 100 && ma < 1000)
            {
                result = prefix + "00" + ma;
            }
            else if (ma >= 1000 && ma < 10000)
            {
                result = prefix + "0" + ma;
            }
            else
            {
                result = prefix + ma;
            }
            return result;
        }
    }
}
