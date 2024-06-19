using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Menu;
using WebApplication2.User;

namespace WebApplication2.Order;

[Route("api/[controller]")]
[ApiController] 
[Authorize]


public class OrderItemController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    public OrderItemController(AppDbContext dbContext) => this._dbContext = dbContext;

    private Guid GetUseIdFromClaims()
    {
        var id = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
        
        return Guid.Parse(id);
        
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderItemModel>>> GetOrders() => await _dbContext.OrderItems
        .Include(o => o.user)
        .Include(o => o.OrderItems)
        .ThenInclude(oi => oi.MenuItem)
        .ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderItemModel>> GetOrderById(Guid id)
    {
        OrderItemModel? orderItemModel = await _dbContext.OrderItems
            .Include(o => o.user)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.MenuItem)
            .FirstOrDefaultAsync(o => o.ID == id);
        return (orderItemModel is null) ? NotFound() : Ok(orderItemModel);
    }

    [HttpGet("user")]
    public async Task<ActionResult<OrderItemModel>> GetOrderByUserId()
    {
        Guid userID = GetUseIdFromClaims();
        OrderItemModel? orderItemModel = await _dbContext.OrderItems
            .Include(o => o.user)
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.MenuItem)
            .Where(o => o.user.ID.Equals(userID))
            .FirstOrDefaultAsync();
        return (orderItemModel is null) ? NotFound("User has no order item") : Ok(orderItemModel);
    }

    [HttpPost]
    public async Task<ActionResult<OrderItemModel>> AddItemToOrder([Required] Guid menuItemID)
    {
        Guid userID = GetUseIdFromClaims();
        // Fetch user from the database
        UserModel? userModel = await _dbContext.users.FindAsync(userID);
        if (userModel is null)
            return BadRequest("User could not be found in the database!");

        // Fetch menu item from the database
        MenuItem? menuItem = await _dbContext.MenuItems.FindAsync(menuItemID);
        if (menuItem is null)
            return BadRequest("Menu Item could not be found in the database!");

        // Fetch the order for the user
        OrderItemModel? order = await _dbContext.OrderItems
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.MenuItem)
            .FirstOrDefaultAsync(o => o.user.ID == userID);

        if (order == null)
        {
            // Create new order if it doesn't exist
            order = new OrderItemModel
            {
                user = userModel,
                OrderItems = new List<OrderItemDetail>
                {
                    new OrderItemDetail
                    {
                        MenuItem = menuItem,
                        Quantity = 1,
                        
                    }
                },
                TotalPrice = menuItem.Price
            };

            await _dbContext.OrderItems.AddAsync(order);
        }
        else
        {
            // Check if the menu item already exists in the order
            var orderItemDetail = order.OrderItems.FirstOrDefault(oi => oi.MenuItem.ID == menuItemID);
            if (orderItemDetail != null)
            {
                // Increase quantity if it already exists
                orderItemDetail.Quantity++;
                order.TotalPrice += menuItem.Price; // Update the total price for the item
            }
            else
            {
                // Add new menu item if it doesn't exist
                order.OrderItems.Add(new OrderItemDetail
                {
                    MenuItem = menuItem,
                    Quantity = 1,
                    
                });
                order.TotalPrice += menuItem.Price;
            }
            

            _dbContext.OrderItems.Update(order);
        }   

        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrderById), new { id = order.ID }, order);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<OrderItemModel>> DeleteItem([Required] Guid id)
    {
        OrderItemModel? orderItemModel = await _dbContext.OrderItems
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.MenuItem)
            .Include(o => o.user)
            .FirstOrDefaultAsync(x => x.ID.Equals(id));
        if (orderItemModel is null)
            return NotFound();

        _dbContext.OrderItems.Remove(orderItemModel);

        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

   
}
