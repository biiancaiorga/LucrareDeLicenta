using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Menu;

[Route("api/[controller]")]
[ApiController]
public class MenuController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    
    public MenuController(AppDbContext dbContext) => this._dbContext = dbContext;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems() => await _dbContext.MenuItems.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<MenuItem>> GetMenuItemById(Guid id)
    {
        MenuItem? item = await  _dbContext.MenuItems.FindAsync(id);
        return (item is null) ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<MenuItem>> AddItem(IFormFile image,[FromForm]MenuItemAddModel model)
    {
        byte[] imageData;
        using (var memoryStream = new MemoryStream())
        {
            await image.CopyToAsync(memoryStream);
            imageData = memoryStream.ToArray();
        }
        
        
        
        MenuItem menuItem = new MenuItem
        {
            ID = Guid.NewGuid(),
            DateModified = DateTime.UtcNow,
            DateCreated = DateTime.UtcNow,
            Price = model.Price,
            Name = model.Name,
            Image = imageData
        };
        await _dbContext.AddAsync(menuItem);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetMenuItemById), new { id = menuItem.ID }, menuItem);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateItem(Guid id, IFormFile? image, [FromForm]MenuItemAddModel model)
    {
        var existingItem = await _dbContext.MenuItems.FindAsync(id);
        if (existingItem == null)
        {
            return NotFound();
        }

        if (image != null)
        {
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                existingItem.Image = memoryStream.ToArray();
            }
        }

        existingItem.Name = model.Name;
        existingItem.Price = model.Price;
        existingItem.DateModified = DateTime.UtcNow;
    
        _dbContext.MenuItems.Update(existingItem);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(Guid id)
    {
        var existingItem = await _dbContext.MenuItems.FindAsync(id);
        if (existingItem == null)
        {
            return NotFound();
        }

        _dbContext.MenuItems.Remove(existingItem);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchItem(Guid id, IFormFile?  image, [FromForm] MenuItemPatchModel model)
    {
        var existingItem = await _dbContext.MenuItems.FindAsync(id);
        if (existingItem == null)
        {
            return NotFound();
        }

        if (model.Name != null)
        {
            existingItem.Name = model.Name;
        }

        if (model.Price.HasValue)
        {
            existingItem.Price = model.Price.Value;
        }

        if (image != null)
        {
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                existingItem.Image = memoryStream.ToArray();
            }
        }

        existingItem.DateModified = DateTime.UtcNow;

        _dbContext.MenuItems.Update(existingItem);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
}
