using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SchoolAppModels.DataModels;
using SchoolAppModels.DataModels.SecurityModels;

namespace SchoolAppCore.SchoolContext
{

    public class SchoolAppContext : IdentityDbContext<ApplicationUser>
    {

        #region DbSets

        public DbSet<Attendance> Attendances { get; set; }

        public DbSet<Standard> Standards { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<ExamSchedule> ExamSchedules { get; set; }

        public DbSet<ExamSubject> ExamSubjects { get; set; }

        public DbSet<ExamType> ExamTypes { get; set; }

        public DbSet<Mark> Marks { get; set; }

        public DbSet<Staff> Staffs { get; set; }

        public DbSet<StaffExperience> StaffExperiences { get; set; }

        public DbSet<StaffSalary> StaffSalaries { get; set; }

        public DbSet<Student> Students { get; set; }

        public DbSet<Subject> Subjects { get; set; }

        public DbSet<FeeType> FeeTypes { get; set; }

        public DbSet<DueBalance> DueBalances { get; set; }

        public DbSet<AcademicMonth> AcademicMonths { get; set; }

        public DbSet<AcademicYear> AcademicYears { get; set; }

        public DbSet<Fee> Fees { get; set; }

        public DbSet<MonthlyPayment> MonthlyPayments { get; set; }

        public DbSet<OthersPayment> OthersPayments { get; set; }

        public DbSet<PaymentDetail> PaymentDetails { get; set; }

        public DbSet<OtherPaymentDetail> OtherPaymentDetails { get; set; }

        public DbSet<PaymentMonth> PaymentMonths { get; set; }

        public DbSet<ExamScheduleStandard> ExamScheduleStandards { get; set; }

        public DbSet<MarkEntry> MarkEntries { get; set; }

        public DbSet<StudentMarksDetails> StudentMarksDetails { get; set; }

        #endregion

        #region Constructor

        public SchoolAppContext(DbContextOptions<SchoolAppContext> options) : base(options)
        {

        }

        #endregion

        public override int SaveChanges()
        {                     
            return base.SaveChanges();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityUserLogin<string>>()
            .HasKey(u => new { u.UserId, u.LoginProvider, u.ProviderKey });

            modelBuilder.Entity<IdentityUserRole<string>>()
            .HasKey(r => new { r.UserId, r.RoleId });


            // Configure the foreign key constraint for dbsMark referencing dbsSubject

            modelBuilder.Entity<Mark>()
                .HasOne(m => m.Subject)
                .WithMany()
                .HasForeignKey(m => m.SubjectId)
                .OnDelete(DeleteBehavior.NoAction);
            // Specify ON DELETE NO ACTION

            modelBuilder.Entity<StaffSalary>(entity =>
            {
                entity.Property(e => e.NetSalary)
                    .HasComputedColumnSql("([BasicSalary] + [FestivalBonus] + [Allowance] + [MedicalAllowance] + [HousingAllowance] + [TransportationAllowance] - [SavingFund] - [Taxes])");
                
            });

            modelBuilder.Entity<StudentMarksDetails>()
            .HasKey(c => new { c.StudentId, c.MarkEntryId });

            #region Index

            modelBuilder.Entity<Subject>()
            .HasIndex(s => s.SubjectCode)
            .IsUnique();

            modelBuilder.Entity<Student>()
                .HasIndex(s => s.UniqueStudentAttendanceNumber)
                .IsUnique();

            modelBuilder.Entity<Staff>()
                .HasIndex(s => s.UniqueStaffAttendanceNumber)
                .IsUnique();

            #endregion

            #region Seed Data

            #region AcademicMonth
            modelBuilder.Entity<AcademicMonth>().HasData(
               new AcademicMonth { MonthId = 1, MonthName = "January" },
               new AcademicMonth { MonthId = 2, MonthName = "February" },
               new AcademicMonth { MonthId = 3, MonthName = "March" },
               new AcademicMonth { MonthId = 4, MonthName = "April" },
               new AcademicMonth { MonthId = 5, MonthName = "May" },
               new AcademicMonth { MonthId = 6, MonthName = "June" },
               new AcademicMonth { MonthId = 7, MonthName = "July" },
               new AcademicMonth { MonthId = 8, MonthName = "August" },
               new AcademicMonth { MonthId = 9, MonthName = "September" },
               new AcademicMonth { MonthId = 10, MonthName = "October" },
               new AcademicMonth { MonthId = 11, MonthName = "November" },
               new AcademicMonth { MonthId = 12, MonthName = "December" }
           );
            for (int year = 2000; year <= 2050; year++)
            {
                modelBuilder.Entity<AcademicYear>().HasData(
                    new AcademicYear { AcademicYearId = year - 2000 + 1, Name = year.ToString() }
                );
            }
            #endregion

            #region Department
            // Seed Department data
            modelBuilder.Entity<Department>().HasData(
    new Department { DepartmentId = 1, DepartmentName = "Teacher" },
    new Department { DepartmentId = 2, DepartmentName = "Account" },
    new Department { DepartmentId = 3, DepartmentName = "Administration" },
    new Department { DepartmentId = 4, DepartmentName = "Student Affairs" },
    new Department { DepartmentId = 5, DepartmentName = "Counseling" },
    new Department { DepartmentId = 6, DepartmentName = "Sports" },
    new Department { DepartmentId = 7, DepartmentName = "Library" },
    new Department { DepartmentId = 8, DepartmentName = "Maintenance" }
);
            #endregion

            #region ExamSchedule
            // Seed ExamSchedule data along with associated ExamSubjects
            modelBuilder.Entity<ExamSchedule>().HasData(
                new ExamSchedule
                {
                    ExamScheduleId = 1,
                    ExamScheduleName = "First Semester"
                    //ExamTypeId = 1
                    //,
                    //ExamSubjects = new List<ExamSubject>
                    //{
                    //new ExamSubject { ExamSubjectId = 1},
                    //new ExamSubject { ExamSubjectId = 2}
                    //}
                },
                new ExamSchedule
                {
                    ExamScheduleId = 2,
                    ExamScheduleName = "Second Semester"
                    //ExamTypeId = 2
                    //,
                    //ExamSubjects = new List<ExamSubject>
                    //{
                    //new ExamSubject { ExamSubjectId = 1},
                    //new ExamSubject { ExamSubjectId = 2 }
                    //}
                },
                new ExamSchedule
                {
                    ExamScheduleId = 3,
                    ExamScheduleName = "Third Semester"
                    //ExamTypeId = 3
                    //,
                    //ExamSubjects = new List<ExamSubject>
                    //{
                    //new ExamSubject { ExamSubjectId = 2},
                    //new ExamSubject { ExamSubjectId = 3 }
                    //}
                }
            );
            #endregion            

            #region ExamType
            // Seed ExamType data
            modelBuilder.Entity<ExamType>().HasData(
                new ExamType { ExamTypeId = 1, ExamTypeName = "Midterm" },
                new ExamType { ExamTypeId = 2, ExamTypeName = "Final" },
                new ExamType { ExamTypeId = 3, ExamTypeName = "Practical" },
                new ExamType { ExamTypeId = 4, ExamTypeName = "Monthly Exam" },
                new ExamType { ExamTypeId = 5, ExamTypeName = "Lab Exam" }
            );
            #endregion

            #region FeeType
            // Seed FeeType data
            modelBuilder.Entity<FeeType>().HasData(
    new FeeType { FeeTypeId = 1, TypeName = "Registration Fee" },
    new FeeType { FeeTypeId = 2, TypeName = "Tuition Fee" },
    new FeeType { FeeTypeId = 3, TypeName = "Library Fee" },
    new FeeType { FeeTypeId = 4, TypeName = "Examination Fee" },
    new FeeType { FeeTypeId = 5, TypeName = "Sports Fee" },
    new FeeType { FeeTypeId = 6, TypeName = "Transportation Fee" }
);
            #endregion

            #region Mark
            // Seed Mark data
            modelBuilder.Entity<Mark>().HasData(
                new Mark
                {
                    MarkId = 1,
                    TotalMarks = 80,
                    PassMarks = 40,
                    ObtainedScore = 65,
                    Grade = Grade.B,
                    PassStatus = Pass.Passed,
                    MarkEntryDate = DateTime.Now,
                    Feedback = "Good job!",
                    StaffId = 1,
                    StudentId = 1,
                    SubjectId = 1
                },
                new Mark
                {
                    MarkId = 2,
                    TotalMarks = 90,
                    PassMarks = 40,
                    ObtainedScore = 75,
                    Grade = Grade.A,
                    PassStatus = Pass.Passed,
                    MarkEntryDate = DateTime.Now,
                    Feedback = "Excellent work!",
                    StaffId = 2,
                    StudentId = 2,
                    SubjectId = 2
                },
                new Mark
                {
                    MarkId = 3,
                    TotalMarks = 90,
                    PassMarks = 40,
                    ObtainedScore = 75,
                    Grade = Grade.A,
                    PassStatus = Pass.Passed,
                    MarkEntryDate = DateTime.Now,
                    Feedback = "Excellent work!",
                    StaffId = 3,
                    StudentId = 3,
                    SubjectId = 3
                }
                // Add more seed data as needed
            );
            #endregion

            #region StaffSalary
            // Seed StaffSalary data if required
            modelBuilder.Entity<StaffSalary>().HasData(
                new StaffSalary
                {
                    StaffSalaryId = 1,
                    StaffName = "Anil Kumar",
                    BasicSalary = 5000,
                    FestivalBonus = 1000,
                    Allowance = 500,
                    MedicalAllowance = 300,
                    HousingAllowance = 800,
                    TransportationAllowance = 200,
                    SavingFund = 200,
                    Taxes = 500,
                },
               new StaffSalary
               {
                   StaffSalaryId = 2,
                   StaffName = "Saurabh Verma",
                   BasicSalary = 5000,
                   FestivalBonus = 1000,
                   Allowance = 500,
                   MedicalAllowance = 300,
                   HousingAllowance = 800,
                   TransportationAllowance = 200,
                   SavingFund = 200,
                   Taxes = 500,
               },
               new StaffSalary
               {
                   StaffSalaryId = 3,
                   StaffName = "Keerthi Roy",
                   BasicSalary = 5000,
                   FestivalBonus = 1000,
                   Allowance = 500,
                   MedicalAllowance = 300,
                   HousingAllowance = 800,
                   TransportationAllowance = 200,
                   SavingFund = 200,
                   Taxes = 500,
               }
            );
            #endregion

            #region Standard
            // Seed Standard data if required
            modelBuilder.Entity<Standard>().HasData(
                new Standard { StandardId = 1, StandardName = "Class One", StandardCapacity = "30" },
                new Standard { StandardId = 2, StandardName = "Class Two", StandardCapacity = "35" },
                new Standard { StandardId = 3, StandardName = "Class Three", StandardCapacity = "32" },
                new Standard { StandardId = 4, StandardName = "Class Four", StandardCapacity = "28" },
                new Standard { StandardId = 5, StandardName = "Class Five", StandardCapacity = "30" },
                new Standard { StandardId = 6, StandardName = "Class Six", StandardCapacity = "30" },
                new Standard { StandardId = 7, StandardName = "Class Seven", StandardCapacity = "30" },
                new Standard { StandardId = 8, StandardName = "Class Eight", StandardCapacity = "30" },
                new Standard { StandardId = 9, StandardName = "Class Nine", StandardCapacity = "30" },
                new Standard { StandardId = 10, StandardName = "Class Ten", StandardCapacity = "30" }
               );

            #endregion

            #region Subject
            // Seed Subject data if required
            modelBuilder.Entity<Subject>().HasData(
                new Subject
                {
                    SubjectId = 1,
                    SubjectName = "Mathematics",
                    SubjectCode = 101,
                    StandardId = 1
                },
                new Subject
                {
                    SubjectId = 2,
                    SubjectName = "Bengali",
                    SubjectCode = 102,
                    StandardId = 1
                },
                new Subject
                {
                    SubjectId = 3,
                    SubjectName = "Physics",
                    SubjectCode = 103,
                    StandardId = 1
                },
                new Subject
                {
                    SubjectId = 4,
                    SubjectName = "Mathematics",
                    SubjectCode = 201,
                    StandardId = 2
                },
                new Subject
                {
                    SubjectId = 5,
                    SubjectName = "Bengali",
                    SubjectCode = 202,
                    StandardId = 2
                },
                new Subject
                {
                    SubjectId = 6,
                    SubjectName = "Physics",
                    SubjectCode = 203,
                    StandardId = 2
                },

                new Subject
                {
                    SubjectId = 7,
                    SubjectName = "Mathematics",
                    SubjectCode = 301,
                    StandardId = 3
                },
                new Subject
                {
                    SubjectId = 8,
                    SubjectName = "Bengali",
                    SubjectCode = 302,
                    StandardId = 3
                },
                new Subject
                {
                    SubjectId = 9,
                    SubjectName = "Physics",
                    SubjectCode = 303,
                    StandardId = 3
                },

                new Subject
                {
                    SubjectId = 10,
                    SubjectName = "Mathematics",
                    SubjectCode = 401,
                    StandardId = 4
                },
                new Subject
                {
                    SubjectId = 11,
                    SubjectName = "Bengali",
                    SubjectCode = 402,
                    StandardId = 4
                },
                new Subject
                {
                    SubjectId = 12,
                    SubjectName = "Physics",
                    SubjectCode = 403,
                    StandardId = 4
                }

            );
            #endregion

            #region StaffExperience_Excluded

            modelBuilder.Entity<StaffExperience>().HasData(
    new StaffExperience
    {
        StaffExperienceId = 1,
        CompanyName = "ABC Company",
        Designation = "Software Engineer",
        JoiningDate = new DateTime(2020, 5, 10),
        LeavingDate = new DateTime(2022, 8, 15),
        Responsibilities = "Developed web applications.",
        Achievements = "Received Employee of the Month award."
    },
    new StaffExperience
    {
        StaffExperienceId = 2,
        CompanyName = "XYZ Corporation",
        Designation = "Data Analyst",
        JoiningDate = new DateTime(2018, 9, 20),
        LeavingDate = new DateTime(2020, 4, 30),
        Responsibilities = "Analyzed data to provide insights.",
        Achievements = "Implemented a new data visualization system."
    },
    new StaffExperience
    {
        StaffExperienceId = 3,
        CompanyName = "EFG Ltd.",
        Designation = "Project Manager",
        JoiningDate = new DateTime(2016, 3, 5),
        LeavingDate = new DateTime(2018, 7, 25),
        Responsibilities = "Led a team of developers.",
        Achievements = "Successfully delivered multiple projects on time."
    }
    // Add more seed data as needed
);

            #endregion

            #region Staff
            modelBuilder.Entity<Staff>().HasData(
               new Staff
               {
                   StaffId = 1,
                   StaffName = "Anil Kumar",
                   UniqueStaffAttendanceNumber = 201,
                   Gender = Gender.Male,
                   DOB = new DateTime(1985, 5, 15),
                   FatherName = "Manish Kumar",
                   MotherName = "Mounika",
                   TemporaryAddress = "Temporary Address",
                   PermanentAddress = "Permanent Address",
                   ContactNumber1 = "1234567890",
                   Email = "anil.kumar@example.com",
                   //ImagePath = "path/to/image.jpg",
                   Qualifications = "Bachelor's in Computer Science",
                   JoiningDate = new DateTime(2010, 7, 1),
                   Designation = Designation.Counselor,
                   BankAccountName = "Anil Kumar",
                   BankAccountNumber = 1234567890,
                   BankName = "ABC Bank",
                   BankBranch = "XYZ Branch",
                   Status = "Active",
                   DepartmentId = 1,
                   StaffSalaryId = 1
               },
               new Staff
               {
                   StaffId = 2,
                   StaffName = "Saurabh Verma",
                   UniqueStaffAttendanceNumber = 202,
                   Gender = Gender.Male,
                   DOB = new DateTime(1990, 8, 20),
                   FatherName = "Dravid Verma",
                   MotherName = "Emily Verma",
                   TemporaryAddress = "Temporary Address",
                   PermanentAddress = "Permanent Address",
                   ContactNumber1 = "9876543210",
                   Email = "saurabh.verma@example.com",
                   //ImagePath = "path/to/image.jpg",
                   Qualifications = "Master's in Education",
                   JoiningDate = new DateTime(2015, 9, 15),
                   Designation = Designation.Headmistress,
                   BankAccountName = "Saurabh Verma",
                   BankAccountNumber = 9873210,
                   BankName = "DEF Bank",
                   BankBranch = "UVW Branch",
                   Status = "Active",
                   DepartmentId = 2,
                   StaffSalaryId = 2
               },
               new Staff
               {
                   StaffId = 3,
                   StaffName = "Kerrthi Roy",
                   UniqueStaffAttendanceNumber = 203,
                   Gender = Gender.Female,
                   DOB = new DateTime(1980, 01, 01),
                   FatherName = "Ramesh Roy",
                   MotherName = "Shilpa Roy",
                   TemporaryAddress = "123 Main Street, Anytown",
                   PermanentAddress = "456 Elm Street, Anytown",
                   ContactNumber1 = "555-123-4567",
                   Email = "keerthi.roy@example.com",
                   Qualifications = "Bachelor of Science in Mathematics",
                   JoiningDate = new DateTime(2020, 08, 15),
                   Designation = Designation.Professor,
                   BankAccountName = "Keerthi Roy",
                   BankAccountNumber = 1234567890,
                   BankName = "Anytown Bank",
                   BankBranch = "Main Street",
                   Status = "Active",
                   DepartmentId = 3,
                   StaffSalaryId = 3
               }

           );
            #endregion

            #region Fee
            // Seed Fee data if required
            modelBuilder.Entity<Fee>().HasData(
    new Fee { FeeId = 1, FeeTypeId = 1, StandardId = 1, PaymentFrequency = Frequency.Yearly, Amount = 1500, DueDate = new DateTime(2024, 5, 1) },
    new Fee { FeeId = 2, FeeTypeId = 2, StandardId = 1, PaymentFrequency = Frequency.Monthly, Amount = 500, DueDate = new DateTime(2024, 5, 5) },
    new Fee { FeeId = 3, FeeTypeId = 3, StandardId = 1, PaymentFrequency = Frequency.Monthly, Amount = 200, DueDate = new DateTime(2024, 5, 10) },
    new Fee { FeeId = 4, FeeTypeId = 6, StandardId = 1, PaymentFrequency = Frequency.Monthly, Amount = 100, DueDate = new DateTime(2024, 5, 15) },
    new Fee { FeeId = 5, FeeTypeId = 5, StandardId = 1, PaymentFrequency = Frequency.Custom, Amount = 250, DueDate = new DateTime(2024, 5, 20) },
    new Fee { FeeId = 6, FeeTypeId = 4, StandardId = 1, PaymentFrequency = Frequency.Custom, Amount = 300, DueDate = new DateTime(2024, 5, 25) },
    new Fee { FeeId = 7, FeeTypeId = 1, StandardId = 2, PaymentFrequency = Frequency.Yearly, Amount = 1500, DueDate = new DateTime(2024, 6, 1) },
    new Fee { FeeId = 8, FeeTypeId = 2, StandardId = 2, PaymentFrequency = Frequency.Monthly, Amount = 500, DueDate = new DateTime(2024, 6, 5) },
    new Fee { FeeId = 9, FeeTypeId = 3, StandardId = 2, PaymentFrequency = Frequency.Monthly, Amount = 200, DueDate = new DateTime(2024, 6, 10) },
    new Fee { FeeId = 10, FeeTypeId = 6, StandardId = 2, PaymentFrequency = Frequency.Monthly, Amount = 100, DueDate = new DateTime(2024, 6, 15) },
    new Fee { FeeId = 11, FeeTypeId = 5, StandardId = 2, PaymentFrequency = Frequency.Custom, Amount = 250, DueDate = new DateTime(2024, 6, 20) },
    new Fee { FeeId = 12, FeeTypeId = 4, StandardId = 2, PaymentFrequency = Frequency.Custom, Amount = 300, DueDate = new DateTime(2024, 6, 25) },
    new Fee { FeeId = 13, FeeTypeId = 1, StandardId = 3, PaymentFrequency = Frequency.Yearly, Amount = 1500, DueDate = new DateTime(2024, 7, 1) },
    new Fee { FeeId = 14, FeeTypeId = 2, StandardId = 3, PaymentFrequency = Frequency.Monthly, Amount = 500, DueDate = new DateTime(2024, 7, 5) },
    new Fee { FeeId = 15, FeeTypeId = 3, StandardId = 3, PaymentFrequency = Frequency.Monthly, Amount = 200, DueDate = new DateTime(2024, 7, 10) },
    new Fee { FeeId = 16, FeeTypeId = 6, StandardId = 3, PaymentFrequency = Frequency.Monthly, Amount = 100, DueDate = new DateTime(2024, 7, 15) },
    new Fee { FeeId = 17, FeeTypeId = 5, StandardId = 3, PaymentFrequency = Frequency.Custom, Amount = 250, DueDate = new DateTime(2024, 7, 20) },
    new Fee { FeeId = 18, FeeTypeId = 4, StandardId = 3, PaymentFrequency = Frequency.Custom, Amount = 300, DueDate = new DateTime(2024, 7, 25) },
    new Fee { FeeId = 19, FeeTypeId = 1, StandardId = 4, PaymentFrequency = Frequency.Yearly, Amount = 1500, DueDate = new DateTime(2024, 8, 1) },
    new Fee { FeeId = 20, FeeTypeId = 2, StandardId = 4, PaymentFrequency = Frequency.Monthly, Amount = 500, DueDate = new DateTime(2024, 8, 5) }
);
            #endregion

            #endregion
        }
    }
}