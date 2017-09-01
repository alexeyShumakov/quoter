using NSubstitute;
using System.Collections.Generic;
using QuoterWeb.Controllers;
using QuoterWeb.Models;
using QuoterWeb.Repository;
using Xunit;

namespace QuoterTests
{
    public class QuotesControllerTest
    {
        [Fact]
        public void Index()
        {
            Quote quote = new Quote
            {
                Author = "name new",
                Body = "body",
                CategoryId = 1
            };

            var repo = Substitute.For<QuoteRepository>();
            List<Quote> quotes = new List<Quote> {quote};
            repo.Search(quote.Author, quote.CategoryId).Returns(quotes);
            repo.When(r => r.Search(quote.Author, quote.CategoryId)).DoNotCallBase();
            QuotesController controller = new QuotesController(repo);

            var result = controller.Index(quote);

            repo.Received().Search(quote.Author, quote.CategoryId);
            Assert.Equal(result.Value, quotes);

        }
        [Fact]
        public void Create()
        {
            Quote quote = new Quote
            {
                Author = "name new",
                Body = "body",
                CategoryId = 1
            };

            var repo = Substitute.ForPartsOf<QuoteRepository>();
            repo.When(r => r.Add(quote)).DoNotCallBase();
            QuotesController controller = new QuotesController(repo);

            var result = controller.Create(quote);

            repo.Received().Add(quote);
            Assert.Equal(result.Value.ToString(), "{ status = created }");
        }

        [Fact]
        public void Delete()
        {
            var repo = Substitute.ForPartsOf<QuoteRepository>();
            repo.When(r => r.Delete(1)).DoNotCallBase();
            QuotesController controller = new QuotesController(repo);

            var result = controller.Delete(1);

            repo.Received().Delete(1);
            Assert.Equal(result.Value.ToString(), "{ status = deleted }");

        }

        [Fact]
        public void Update()
        {
            Quote quote = new Quote
            {
                Id = 1,
                Author = "name new",
                Body = "body",
                CategoryId = 1
            };

            var repo = Substitute.For<QuoteRepository>();
            repo.When(r => r.Update(quote.Id, quote)).DoNotCallBase();
            QuotesController controller = new QuotesController(repo);

            var result = controller.Update(quote.Id, quote);

            repo.Received().Update(quote.Id, quote);
            Assert.Equal(result.Value.ToString(), "{ status = updated }");
        }
    }
}
