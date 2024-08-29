using SchoolAppModels.DataModels;
using System.ComponentModel.DataAnnotations;

namespace SchoolAppAPI.ViewModels
{
    public class MarksDataVM
    {
        public int MarkEntryId { get; set; }
        public int StudentId { get; set; }
        public string StudentName { get; set; }
       
        public float? Mark { get; set; }
        //public PassStatus Status { get; set; }


    }
}
