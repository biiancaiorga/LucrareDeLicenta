

namespace WebApplication2.User;

public class UserService
{
    private readonly AppDbContext _dbContext;

    public UserService(AppDbContext dbContext) => this._dbContext = dbContext;

    public async Task<UserModel> ValidateUser(UserLoginModel model)
    {
        var user = _dbContext.users.SingleOrDefault(u => u.Email == model.Email);
        if (user is null || !user.Password.Equals(model.Password))
            return null;
        return user;
    }
}