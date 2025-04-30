public class TransactionController : Controller
{
    private readonly FinlyticsContext _context;

    public TransactionController(FinlyticsContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        return View(await _context.Transactions.ToListAsync());
    }
}
