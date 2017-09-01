using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuoterWeb.Repository;

namespace QuoterWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly CategoryRepository _repo;

        public HomeController(CategoryRepository repo)
        {
            _repo = repo;
        }

        public IActionResult Index()
        {
            var categories = _repo.All();

            ViewData["JsonCategories"] = JsonConvert.SerializeObject(categories);

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}