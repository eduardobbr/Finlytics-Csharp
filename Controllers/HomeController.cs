using Microsoft.AspNetCore.Mvc;

namespace Finlytics_Csharp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}