using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using QuoterWeb.Models;

namespace QuoterWeb.Repository
{
    public class CategoryRepository
    {
        private readonly string connectionString;

        public CategoryRepository()
        {
            connectionString = @"Server=localhost;Database=QuoterDevelopment;Trusted_Connection=true;";
        }

        public IDbConnection Connection => new SqlConnection(connectionString);

        public virtual List<Category> All()
        {
            using (var dbConnection = Connection)
            {
                var sQuery = "SELECT * FROM Categories";
                dbConnection.Open();
                return dbConnection.Query<Category>(sQuery).ToList();
            }
        }
    }
}