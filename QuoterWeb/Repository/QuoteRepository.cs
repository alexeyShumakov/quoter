using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using QuoterWeb.Models;

namespace QuoterWeb.Repository
{
    public class QuoteRepository
    {
        private readonly string _connectionString;

        public QuoteRepository()
        {
            _connectionString = @"Server=localhost;Database=QuoterDevelopment;Trusted_Connection=true;";
        }

        public IDbConnection Connection => new SqlConnection(_connectionString);

        public virtual void Delete(int id)
        {
            using (var dbConnection = Connection)
            {
                const string sQuery = "DELETE FROM Quotes WHERE id = @id";
                dbConnection.Open();
                dbConnection.Execute(sQuery, new {id});
            }
        }

        public virtual void Update(int id, Quote quote)
        {
            using (var dbConnection = Connection)
            {
                const string sQuery =
                    "UPDATE Quotes SET Author = @Author, Body = @Body, CategoryId = @CategoryId WHERE id = @Id";
                dbConnection.Open();
                dbConnection.Execute(sQuery, new {id, quote.Author, quote.Body, quote.CategoryId});
            }
        }

        public virtual void Add(Quote quote)
        {
            using (var dbConnection = Connection)
            {
                const string sQuery = "INSERT INTO Quotes (Body, Author, CategoryId) VALUES(@Body, @Author, @CategoryId)";
                dbConnection.Open();
                dbConnection.Execute(sQuery, quote);
            }
        }

        public virtual List<Quote> Search(string author, int categoryId)
        {
            using (var dbConnection = Connection)
            {
                const string sQuery =
                    @"SELECT * FROM Quotes AS q INNER JOIN Categories AS c ON q.CategoryId = c.Id
                    WHERE (q.Author LIKE '%' + @Author + '%' OR @Author IS NULL)
                    AND (q.CategoryId = @CategoryId OR @CategoryId = 0)
                    ORDER BY q.CreatedAt, q.id DESC";

                dbConnection.Open();

                return dbConnection.Query<Quote, Category, Quote>(sQuery,
                    (quote, category) =>
                    {
                        quote.Category = category;
                        return quote;
                    },
                    new {CategoryId = categoryId, Author = author}).ToList();
            }
        }
    }
}