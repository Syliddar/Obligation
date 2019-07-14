using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Obligation.Models;

namespace Obligation.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var viewModel = new List<PlayerCharacterViewModel>();
            using (StreamReader reader = new StreamReader("wwwroot/data/data.json"))
            {
                var rawJson = reader.ReadToEnd();
                var modelList = JsonConvert.DeserializeObject<PlayerCharacterModel[]>(rawJson).ToList();

                foreach (var item in modelList.OrderBy(x => Guid.NewGuid()))
                {
                    var totalCurrentObligation = viewModel.Sum(c => c.Obligation);
                    viewModel.Add(new PlayerCharacterViewModel
                    {
                        CharacterName = item.CharacterName,
                        Obligation = item.Obligation,
                        ObligationRangeStart = totalCurrentObligation + 1,
                        ObligationRangeEnd = totalCurrentObligation + item.Obligation
                    });
                }
            }



            return View(viewModel);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
