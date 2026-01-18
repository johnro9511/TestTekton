namespace LeaveManagement.Models
{
    public class LeaveRequest
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public LeaveStatus Status { get; set; }
        public string? Reason { get; set; }
    }// Leaverequest

    /* STATUS */
    public enum LeaveStatus
    {
        Pending,
        Approved,
        Rejected
    }// Status

    /* QUERY FOR DASHBOARD */
    public class LeaveRequestDash
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = "";
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public LeaveStatus Status { get; set; }
        public string? Reason { get; set; }
    }// LeaveRequestDash

}
