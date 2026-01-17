using LeaveManagement.Data;
using LeaveManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace LeaveManagement.Services
{
    public class LeaveRequestService
    {
        private readonly AppDbContext _context;

        public LeaveRequestService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<LeaveRequest> CreateAsync(
            int employeeId,
            DateTime start,
            DateTime end,
            string reason)
        {
            if (start > end)
                throw new InvalidOperationException("Start date must be before end date.");

            var overlappingApproved = await _context.LeaveRequests.AnyAsync(l =>
                l.EmployeeId == employeeId &&
                l.Status == LeaveStatus.Approved &&
                start <= l.EndDate &&
                end >= l.StartDate);

            if (overlappingApproved)
                throw new InvalidOperationException("Overlapping approved leave exists.");

            var days = (end - start).TotalDays + 1;

            var request = new LeaveRequest
            {
                EmployeeId = employeeId,
                StartDate = start,
                EndDate = end,
                Reason = reason,
                Status = days > 15 ? LeaveStatus.Rejected : LeaveStatus.Pending
            };

            _context.LeaveRequests.Add(request);
            await _context.SaveChangesAsync();

            return request;
        }
    }// LeaveRequestService.cs
}
