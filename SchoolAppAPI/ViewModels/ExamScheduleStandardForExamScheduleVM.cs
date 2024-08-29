using SchoolAppModels.DataModels;

namespace SchoolAppAPI.ViewModels
{
    public class ExamScheduleStandardForExamScheduleVM
    {
        public string? StandardName { get; set; }

        public IEnumerable<ExamSubjectVM>? ExamSubjects { get; set; } = [];
    }
}
