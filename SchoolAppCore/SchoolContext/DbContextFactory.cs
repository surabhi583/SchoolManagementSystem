using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SchoolAppCore.SchoolContext
{

    /*
     IDesignTimeDbContextFactory:

     It enables Entity Framework Core tools to create instances of a DbContext class for design-time operations, such as:
        Generating database migrations
        Scaffolding CRUD (Create, Read, Update, Delete) controllers and views
     */

    public class DbContextFactory : IDesignTimeDbContextFactory<SchoolAppContext>
    {
        public SchoolAppContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

            // Find a way to get different connection string 
            var connectionString = configuration.GetConnectionString("SchoolDbConnection");
            
            var optionBuilder = new DbContextOptionsBuilder<SchoolAppContext>();
            optionBuilder.UseSqlServer(connectionString);

            return new SchoolAppContext(optionBuilder.Options);

        }
    }
}
