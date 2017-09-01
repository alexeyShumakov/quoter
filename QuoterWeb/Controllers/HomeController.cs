using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QuoterWeb.Models;
using QuoterWeb.Repository;
using Newtonsoft.Json;

namespace QuoterWeb.Controllers
{
    public class HomeController : Controller
    {
        private CategoryRepository _repo;

        public HomeController(CategoryRepository repo)
        {
            _repo = repo;
        }

        public IActionResult Index()
        {
            List<Category> categories = _repo.All();

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
