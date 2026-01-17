namespace LeaveManagement.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Psswrd { get; set; }
        public Role Role { get; set; }
    }// Employee
    
    /* ROLE OF EMPLOYEES */
    public enum Role
    {
        Employee,
        Manager
    }// Role
}
