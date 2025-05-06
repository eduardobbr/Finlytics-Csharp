[ApiController]
[Route("api/[controller]")]
public class StockActionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public StockActionsController(AppDbContext context)
    {
        _context = context;
    }

    
    [HttpPost]
    public async Task<IActionResult> CreateStockAction([FromBody] StockAction action)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.StockActions.Add(action);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStockActionById), new { id = action.Id }, action);
    }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<StockAction>> GetStockActionById(int id)
    {
        var action = await _context.StockActions.FindAsync(id);

        if (action == null)
            return NotFound();

        return action;
    }
}
