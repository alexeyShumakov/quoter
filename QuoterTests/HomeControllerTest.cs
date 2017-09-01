using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using System;
using System.Collections.Generic;
using System.Text;
using QuoterWeb.Controllers;
using QuoterWeb.Models;
using QuoterWeb.Repository;
using Xunit;

namespace QuoterTests
{
    public class HomeControllerTest
    {
        [Fact]
        public void Index()
        {
            Category category = new Category
            {
                Id = 1,
                Title = "title"
            };

            var repo = Substitute.For<CategoryRepository>();
            List<Category> categories = new List<Category> {category};

            repo.When(r => r.All()).DoNotCallBase();
            repo.All().Returns(categories);

            HomeController controller = new HomeController(repo);
            var vr = controller.Index() as ViewResult;

            repo.Received().All();
            Assert.Equal(@"[{""Id"":1,""Title"":""title""}]", vr.ViewData["JsonCategories"]);

        }
    }
}
