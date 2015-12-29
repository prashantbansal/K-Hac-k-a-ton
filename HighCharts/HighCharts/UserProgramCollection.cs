using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HighCharts
{
    public class UserProgramCollection
    {
        public List<UserProgram> UserPrograms { get; set; }

        public UserProgramCollection()
        {
            this.UserPrograms = new List<UserProgram>();
        }
    }
}