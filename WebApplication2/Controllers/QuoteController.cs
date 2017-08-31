using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Repository;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Produces("application/json")]
    public class QuoteController : Controller
    {
        [Route("api/quotes")]
        public JsonResult Index([FromQuery]Quote parameters)
        {
            QuoteRepository repo = new QuoteRepository();
            List<Quote> quotes = repo.Search(parameters.Author, parameters.CategoryId);
            return Json(quotes);
        }

        [HttpPost]
        [Route("api/quotes")]
        public JsonResult Create([FromBody]Quote newQuote)
        {
            QuoteRepository repo = new QuoteRepository();
            if(ModelState.IsValid)
            {
                repo.Add(newQuote);
                return Json(new { status = "ok"});
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
        [Route("api/quotes/{id}/delete")]
        public JsonResult Delete(int id)
        {
            QuoteRepository repo = new QuoteRepository();
            repo.Delete(id);
            return Json(new { status = "ok"});
        }

        [HttpPatch]
        [Route("api/quotes/{id}")]
        public JsonResult Update(int id, [FromBody]Quote quote)
        {
            if(ModelState.IsValid)
            {
                QuoteRepository repo = new QuoteRepository();
                repo.Update(id, quote);
                return Json(new { status = "ok"});
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