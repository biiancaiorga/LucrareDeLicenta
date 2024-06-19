using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApplication2.Menu;

namespace WebApplication2.User;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly UserService _userService;
    private readonly IConfiguration _configuration;

    public UserController(AppDbContext dbContext, UserService userService, IConfiguration configuration)
    {
        this._dbContext = dbContext;
        this._userService = userService;
        this._configuration = configuration;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers() => await _dbContext.users.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<UserModel>> GetUserById(Guid id)
    {
        UserModel? user = await _dbContext.users.FindAsync(id);
        return (user is null) ? NotFound() : Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserModel>> Login([FromBody] UserLoginModel model)
    {
        UserModel? user = await _userService.ValidateUser(model);
        if (user is null)
        {
            return Unauthorized("Invalid username or password");

        }

        var tokenString = GenerateJwtToken(user);
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.Strict,
        };
        Response.Cookies.Append("jwtToken", tokenString, cookieOptions);

        return Ok(new { message = tokenString });


    }


    private string GenerateJwtToken(UserModel user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }


    [HttpPost("register")]
    public async Task<ActionResult<UserModel>> AddUser(UserAddModel userModel)
    {
        UserModel user = new UserModel
        {
            ID = Guid.NewGuid(),
            DateCreated = DateTime.UtcNow,
            DateModified = DateTime.UtcNow,
            Username = userModel.Username,
            Password = userModel.Password,
            Email = userModel.Email
        };
        await _dbContext.users.AddAsync(user);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUserById), new { id = user.ID }, user);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UserModel>> UpdateUser(Guid id, [FromForm]UserAddModel userAddModel)
    {
        UserModel? user = await _dbContext.users.FindAsync(id);
        if (user is null)
            return NotFound("User could not be found");

        user.Email = userAddModel.Email;
        user.ID = id;
        user.Password = userAddModel.Password;
        user.Username = userAddModel.Username;
        user.DateModified = DateTime.UtcNow;
        _dbContext.Update(user);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchUser(Guid id, [FromForm] UserPatchModel userPatchModel)
    {
        UserModel? user = await _dbContext.users.FindAsync(id);
        if (user is null)
        {
            return NotFound("User could not be found");
        }

        if (userPatchModel.Username != null)
        {
            user.Username = userPatchModel.Username;
        }

        if (userPatchModel.Password != null)
        {
            user.Password = userPatchModel.Password;
        }

        if (userPatchModel.Email != null)
        {
            user.Email = userPatchModel.Email;
        }

        user.DateModified = DateTime.UtcNow;

        _dbContext.Update(user);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult<UserModel>> DeleteUser(Guid id)
    {
        UserModel? user = await _dbContext.users.FindAsync(id);
        if (user is null)
            return NotFound("User could not be found");

        _dbContext.Remove(user);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
    
}