using LeaveManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace LeaveManagement.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /* INSERT DATA IN TABLE EMPLOYEE */
            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    Id = 1,
                    Name = "JUAN MALDONADO",
                    Email = "juan01@gmail.com",
                    Psswrd = "User01x@",
                    Role = Role.Employee
                },
                new Employee
                {
                    Id = 2,
                    Name = "RODRIGO PEREZ",
                    Email = "rodri02@gmail.com",
                    Psswrd = "Admin02x@",
                    Role = Role.Manager
                },
                new Employee
                {
                    Id = 3,
                    Name = "BEYDI LOPEZ",
                    Email = "beydi03@gmail.com",
                    Psswrd = "User03x@",
                    Role = Role.Employee
                }
            );
        }// ModelCreating
    }// AppDbContext
}
