using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Finlytics_Csharp.Models; 
using Finlytics_Csharp.Data;   


[ApiController]
[Route("api/[controller]")]
public class StockActionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public StockActionsController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/StockActions
    [HttpPost]
    public async Task<IActionResult> CreateStockAction([FromBody] StockAction action)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.StockActions.Add(action);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStockActionById), new { id = action.Id }, action);
    }

    // GET: api/StockActions/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<StockAction>> GetStockActionById(int id)
    {
        var action = await _context.StockActions.FindAsync(id);

        if (action == null)
            return NotFound();

        return action;
    }

    // PUT: api/StockActions/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStockAction(int id, [FromBody] StockAction updatedAction)
    {
        if (id != updatedAction.Id)
            return BadRequest("ID in the URL does not match the ID in the body.");

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingAction = await _context.StockActions.FindAsync(id);
        if (existingAction == null)
            return NotFound();

        // Update the properties of the existing entity
        existingAction.Name = updatedAction.Name;
        existingAction.Description = updatedAction.Description;
        existingAction.Quantity = updatedAction.Quantity;

        _context.StockActions.Update(existingAction);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/StockActions/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStockAction(int id)
    {
        var action = await _context.StockActions.FindAsync(id);
        if (action == null)
            return NotFound();

        _context.StockActions.Remove(action);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}