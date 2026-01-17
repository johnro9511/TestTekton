using LeaveManagement.Data;
using LeaveManagement.Models;

namespace LeaveManagement.Infrastructure;

public class UserContext
{
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _http;

    public UserContext(AppDbContext context, IHttpContextAccessor http)
    {
        _context = context;
        _http = http;
    }

    public async Task<Employee> GetCurrentUser()
    {
        var request = _http.HttpContext!.Request;

        if (!request.Headers.TryGetValue("X-User-Id", out var id))
            throw new UnauthorizedAccessException();

        var user = await _context.Employees.FindAsync(int.Parse(id!));
        return user ?? throw new UnauthorizedAccessException();
    }// UserContext
}
