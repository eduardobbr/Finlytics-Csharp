using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Finlytics_Csharp.Data;
using Finlytics_Csharp.Models;
using Microsoft.EntityFrameworkCore;

namespace Finlytics_Csharp.Controllers
{
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

        // GET: api/StockActions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockAction>>> GetAllStockActions()
        {
            var actions = await _context.StockActions
                .Where(a => a.DateDeleted == null)
                .ToListAsync();

            return Ok(actions);
        }

        // GET: api/StockActions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<StockAction>> GetStockActionById(int id)
        {
            var action = await _context.StockActions
                .FirstOrDefaultAsync(a => a.Id == id && a.DateDeleted == null);

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
            if (existingAction == null || existingAction.DateDeleted != null)
                return NotFound();

            // Atualiza campos permitidos
            existingAction.Ticker = updatedAction.Ticker;
            existingAction.CompanyName = updatedAction.CompanyName;
            existingAction.PurchaseDate = updatedAction.PurchaseDate;
            existingAction.Currency = updatedAction.Currency;
            existingAction.PurchasePrice = updatedAction.PurchasePrice;
            existingAction.CurrentPrice = updatedAction.CurrentPrice;
            existingAction.PurchaseFee = updatedAction.PurchaseFee;
            existingAction.Quantity = updatedAction.Quantity;
            existingAction.ProbabilityArrow = updatedAction.ProbabilityArrow;
            existingAction.Upside = updatedAction.Upside;
            existingAction.Downside = updatedAction.Downside;
            existingAction.Quality = updatedAction.Quality;

            _context.StockActions.Update(existingAction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE (soft): api/StockActions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteStockAction(int id)
        {
            var action = await _context.StockActions.FindAsync(id);
            if (action == null || action.DateDeleted != null)
                return NotFound();

            action.DateDeleted = DateTime.UtcNow;
            _context.StockActions.Update(action);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/StockActions/deleted
        [HttpGet("deleted")]
        public async Task<ActionResult<IEnumerable<StockAction>>> GetDeletedStockActions()
        {
            var deletedActions = await _context.StockActions
                .Where(a => a.DateDeleted != null)
                .ToListAsync();

            return Ok(deletedActions);
        }

    }
}
