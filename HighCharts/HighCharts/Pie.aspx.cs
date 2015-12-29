using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HighCharts
{
    public partial class Pie : System.Web.UI.Page
    {
        public List<UserProgram> UserPrograms {get;set;}

        protected void Page_Load(object sender, EventArgs e)
        {
            this.UserPrograms = new List<UserProgram>();
            this.PopulateHighCharts();
        }

        public void PopulateHighCharts()
        {
            UserProgram greProgram = new UserProgram() { ID = "1", Name = "GRE", Score = 233 };
            greProgram.userSubPrograms.Add(new UserProgram() { ID = "11", Name = "GRE1", Score = 25 });
            greProgram.userSubPrograms.Add(new UserProgram() { ID = "12", Name = "GRE2", Score = 25 });
            greProgram.userSubPrograms.Add(new UserProgram() { ID = "13", Name = "GRE3", Score = 25 });
            UserPrograms.Add(greProgram);

            UserProgram gmatProgram = new UserProgram() { ID = "2", Name = "GMAT", Score = 27 };
            gmatProgram.userSubPrograms.Add(new UserProgram() { ID = "21", Name = "GMAT1", Score = 25 });
            gmatProgram.userSubPrograms.Add(new UserProgram() { ID = "22", Name = "GMAT2", Score = 25 });
            gmatProgram.userSubPrograms.Add(new UserProgram() { ID = "23", Name = "GMAT3", Score = 25 });
            UserPrograms.Add(gmatProgram);

            UserProgram kbrProgram = new UserProgram() { ID = "3", Name = "KBR", Score = 45 };
            kbrProgram.userSubPrograms.Add(new UserProgram() { ID = "31", Name = "KBR1", Score = 25 });
            kbrProgram.userSubPrograms.Add(new UserProgram() { ID = "32", Name = "KBR2", Score = 25 });
            kbrProgram.userSubPrograms.Add(new UserProgram() { ID = "33", Name = "KBR3", Score = 25 });
            UserPrograms.Add(kbrProgram);

            UserProgram MCADProgram = new UserProgram() { ID = "3", Name = "MCAD", Score = 5 };
            MCADProgram.userSubPrograms.Add(new UserProgram() { ID = "31", Name = "KBR1", Score = 25 });
            MCADProgram.userSubPrograms.Add(new UserProgram() { ID = "32", Name = "KBR2", Score = 25 });
            MCADProgram.userSubPrograms.Add(new UserProgram() { ID = "33", Name = "KBR3", Score = 25 });
            UserPrograms.Add(MCADProgram);
        }
    }
}