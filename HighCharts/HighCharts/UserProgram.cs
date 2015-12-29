using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HighCharts
{
    public class UserProgram
    {
        public string ID { get; set; }

        public string Name { get; set; }

        public double Score { get; set; }

        public List<UserProgram> userSubPrograms { get; set; }

        public UserProgram()
        {
            this.userSubPrograms = new List<UserProgram>();
        }
    }
}