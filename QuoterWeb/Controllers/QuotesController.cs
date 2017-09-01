using System.Linq;
using Microsoft.AspNetCore.Mvc;
using QuoterWeb.Models;
using QuoterWeb.Repository;

namespace QuoterWeb.Controllers
{
    [Produces("application/json")]
    public class QuotesController : Controller
    {
        private readonly QuoteRepository _repo;

        public QuotesController(QuoteRepository repo)
        {
            _repo = repo;
        }

        public JsonResult Index([FromQuery] Quote parameters)
        {
            var quotes = _repo.Search(parameters.Author, parameters.CategoryId);
            return Json(quotes);
        }

        [HttpPost]
        public JsonResult Create([FromBody] Quote newQuote)
        {
            if (ModelState.IsValid)
            {
                _repo.Add(newQuote);
                return Json(new {status = "created"});
            }
            Response.StatusCode = 422;

            var errorList = (from item in ModelState
                where item.Value.Errors.Any()
                select item.Value.Errors[0].ErrorMessage).ToList();
            return Json(errorList);
        }

        [HttpDelete]
        public JsonResult Delete(int id)
        {
            _repo.Delete(id);
            return Json(new {status = "deleted"});
        }

        [HttpPatch]
        public JsonResult Update(int id, [FromBody] Quote quote)
        {
            if (ModelState.IsValid)
            {
                _repo.Update(id, quote);
                return Json(new {status = "updated"});
            }
            Response.StatusCode = 422;

            var errorList = (from item in ModelState
                where item.Value.Errors.Any()
                select item.Value.Errors[0].ErrorMessage).ToList();
            return Json(errorList);
        }
    }
}