using SchoolAppModels.DataModels.SecurityModels;

namespace SchoolAppAPI.Services
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user);
    }
}
