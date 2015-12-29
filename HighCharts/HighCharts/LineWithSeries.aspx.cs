using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HighCharts
{
    public partial class LineWithSeries : System.Web.UI.Page
    {
        public List<int> PointsList { get; set; }
        protected void Page_Load(object sender, EventArgs e)
        {

            this.PointsList = new List<int>();
            this.PopulatePointsList();
        }

        public void PopulatePointsList()
        {
            Random random = new Random();
            for (int i = 0; i < 500; i++)
            {
                this.PointsList.Add(random.Next(50,100));
            }
        }
    }
}