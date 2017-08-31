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
    public class QuoteRepository
    {
        private string connectionString;
        public QuoteRepository()
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

        public void Delete(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = "DELETE FROM Quotes WHERE id = @id";
                dbConnection.Open();
                dbConnection.Execute(sQuery, new { id = id});
            }

        }

        public void Update(int id, Quote quote)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = "UPDATE Quotes SET Author = @Author, Body = @Body, CategoryId = @CategoryId WHERE id = @Id";
                dbConnection.Open();
                dbConnection.Execute(sQuery, new { id = id, Author = quote.Author, Body = quote.Body, CategoryId = quote.CategoryId});
            }
        }

        public void Add(Quote quote)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = "INSERT INTO Quotes (Body, Author, CategoryId) VALUES(@Body, @Author, @CategoryId)";
                dbConnection.Open();
                dbConnection.Execute(sQuery, quote);
            }
        }

        public List<Quote> Search(string author, int categoryId)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = 
                    @"SELECT * FROM Quotes AS q INNER JOIN Categories AS c ON q.CategoryId = c.Id
                    WHERE (q.Author LIKE '%' + @Author + '%' OR @Author IS NULL)
                    AND (q.CategoryId = @CategoryId OR @CategoryId = 0)
                    ORDER BY q.CreatedAt, q.id DESC";

                dbConnection.Open();

                return dbConnection.Query<Quote, Category, Quote>(sQuery,
                    (quote, category) => { quote.Category = category; return quote; },
                    new { CategoryId = categoryId, Author = author }).ToList();
            }

        }
        public List<Quote> All()
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = " SELECT * FROM Quotes AS q INNER JOIN Categories AS c ON q.CategoryId = c.Id ";
                dbConnection.Open();
                return dbConnection.Query<Quote, Category, Quote>(sQuery, (quote, category) => { quote.Category = category; return quote; }).ToList();
            }
        }
    }
}
