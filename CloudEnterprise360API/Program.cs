using CloudEnterprise360API.Data;
using CloudEnterprise360API.Models;
using CloudEnterprise360API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<Context>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//To be able to inject JWTService class inside our Controller
builder.Services.AddScoped<JWTService>();

builder.Services.AddIdentityCore<User>(options =>
{
    //password configuration
    options.Password.RequiredLength = 6;
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;

    //For email confiramation
    options.SignIn.RequireConfirmedEmail = true;
})
    .AddRoles<IdentityRole>() //To be able to add roles
    .AddRoleManager<RoleManager<IdentityRole>>() //To be able to make use of role manager
    .AddEntityFrameworkStores<Context>() //Providing our context
    .AddSignInManager <SignInManager<User>>() //Make use of sign in manger
    .AddUserManager<UserManager<User>>() //make use of user manager to create users
    .AddDefaultTokenProviders(); //To be able to create tokens for email services

//To authenticate users using JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            //validate the token based on the key we have provided inside appsettings.development.json JWT:Key
            ValidateIssuerSigningKey = true,
            //The issure singing key based on JWT:Key
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
            //The issure which in here is the api project url we are using
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            //validate the issure (who ever is issuing the JWT)
            ValidateIssuer = true,
            //dont validate audience (angular side)
            ValidateAudience = false
        };
    });

builder.Services.AddCors();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = actionContext =>
    {
        var errors = actionContext.ModelState
            .Where(x => x.Value.Errors.Count > 0)
            .SelectMany(x => x.Value.Errors)
            .Select(x => x.ErrorMessage).ToArray();

        var toReturn = new
        {
            Errors = errors
        };

        return new BadRequestObjectResult(toReturn);
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(builder.Configuration["JWT:ClientUrl"]);
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Adding UseAuthentication into our pipeline and this should come before UseAuthorrization
// Authentication verifies the identity of a user or service, and authorization determines their acccess rights.
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
