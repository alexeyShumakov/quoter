using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Models;

namespace WebApplication2.Repository
{
    public class CategoryRepository
    {
        private string connectionString;
        public CategoryRepository()
        {
            connectionString = @"Server=localhost;Database=QuoterDevelopment;Trusted_Connection=true;";
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(connectionString);
            }
        }

        public List<Category> All()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = "SELECT * FROM Categories";
                dbConnection.Open();
                return dbConnection.Query<Category>(sQuery).ToList();
            }
        }
    }
}
