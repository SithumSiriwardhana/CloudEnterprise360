using CloudEnterprise360API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CloudEnterprise360API.Data
{
    public class Context:IdentityDbContext<User>
    {
        public Context(DbContextOptions<Context> options):base (options) { }
    }
}
