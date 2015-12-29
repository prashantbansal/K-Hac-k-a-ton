using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HighCharts
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string inputValue = "dataplain=userId=114743789&userName=pmbrtester11@mailinator.com&firstName=pmbrtester11&lastName=Pmbrtester11&email=pmbrtester11@mailinator.com&product=SBRLFL&courseAccessId=993100021&KBSId=null&asset=4292&currentTime=2011-08-25T12%3A19%3A08%3A826&expireDate=2012-02-25T03:34:29&length=267&PRODUCTS=SBRLFL&COURSEACCESSID=993100001&ENROLLMENTID=&COMMAND=start&USERID=1147400003";
            
            string expirationDate = string.Empty;
            if (inputValue.Contains("expireDate="))
            {
                //returns value between 'expireDate' and '&'
                Regex regex = new Regex("expireDate=(.*?)&");
                var result = regex.Match(inputValue);
                expirationDate = (result.Groups.Count >= 1) ? result.Groups[1].ToString() : string.Empty;

                //If date format is "2012-02-25T03:34:29:000" return string before last ':'
             
                expirationDate = (expirationDate.Count(x => x == ':') == 3) ?
                    expirationDate.Substring(0, expirationDate.LastIndexOf(':')) :
                    expirationDate;
            }
            

            

            DateTime dateTime = DateTime.MinValue;
            if (DateTime.TryParse("2012-02-25T03:34:29", out dateTime))
            {
 
            }
                
        }
    }
}