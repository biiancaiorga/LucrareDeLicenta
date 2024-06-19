using WebApplication2.Menu;

namespace WebApplication2.Order;

public class OrderItemDetail : Entity
{
    public MenuItem MenuItem { get; set; }
    public int Quantity { get; set; }
    
}