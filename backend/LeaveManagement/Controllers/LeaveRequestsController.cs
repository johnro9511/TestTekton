using LeaveManagement.Data;
using LeaveManagement.DTOs;
using LeaveManagement.Models;
using LeaveManagement.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace LeaveManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly LeaveRequestService _service;

        public LeaveRequestsController(AppDbContext context, LeaveRequestService service)
        {
            _context = context;
            _service = service;
        }

        private async Task<Employee> GetCurrentUser()
        {
            if (!Request.Headers.TryGetValue("X-User-Id", out var idValue))
                throw new UnauthorizedAccessException("X-User-Id header missing.");

            var id = int.Parse(idValue!);
            Debug.WriteLine("iduser: " + id);

            return await _context.Employees.FindAsync(id)
                   ?? throw new UnauthorizedAccessException("User not found.");
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await GetCurrentUser();

            var query = _context.LeaveRequests
                .Include(l => l.Employee)
                .AsQueryable();

            if (user.Role == Role.Employee)
                query = query.Where(l => l.EmployeeId == user.Id);

            return Ok(await query.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateLeaveRequestDto dto)
        {
            try
            {
                var user = await GetCurrentUser();

                var result = await _service.CreateAsync(
                    user.Id,
                    dto.StartDate,
                    dto.EndDate,
                    dto.Reason);

                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateLeaveStatusDto dto)
        {
            var user = await GetCurrentUser();
            if (user.Role != Role.Manager)
                return Forbid();

            var request = await _context.LeaveRequests.FindAsync(id);
            if (request == null)
                return NotFound();

            request.Status = dto.Status;
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await GetCurrentUser();
            var request = await _context.LeaveRequests.FindAsync(id);

            if (request == null)
                return NotFound();

            if (request.EmployeeId != user.Id || request.Status != LeaveStatus.Pending)
                return Forbid();

            _context.LeaveRequests.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }// LeaveRequestsController
}
