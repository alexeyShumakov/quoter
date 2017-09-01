using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuoterWeb.Repository;
using QuoterWeb.Models;

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

        public JsonResult Index([FromQuery]Quote parameters)
        {
            List<Quote> quotes = _repo.Search(parameters.Author, parameters.CategoryId);
            return Json(quotes);
        }

        [HttpPost]
        public JsonResult Create([FromBody]Quote newQuote)
        {
            if(ModelState.IsValid)
            {
                _repo.Add(newQuote);
                return Json(new { status = "created"});
            } else
            {
                Response.StatusCode = 422;

                var errorList = (from item in ModelState
                        where item.Value.Errors.Any() 
                        select item.Value.Errors[0].ErrorMessage).ToList();
                return Json(errorList);
            }

        }

        [HttpDelete]
        public JsonResult Delete(int id)
        {
            _repo.Delete(id);
            return Json(new { status = "deleted"});
        }

        [HttpPatch]
        public JsonResult Update(int id, [FromBody]Quote quote)
        {
            if(ModelState.IsValid)
            {
                _repo.Update(id, quote);
                return Json(new { status = "updated"});
            } else
            {
                Response.StatusCode = 422;

                var errorList = (from item in ModelState
                        where item.Value.Errors.Any() 
                        select item.Value.Errors[0].ErrorMessage).ToList();
                return Json(errorList);
            }
        }
    }
}