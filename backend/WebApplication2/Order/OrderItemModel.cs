using WebApplication2.Menu;
using WebApplication2.User;

namespace WebApplication2.Order;

public class OrderItemModel : Entity
{
    public UserModel user { get; set; }
    public ICollection<OrderItemDetail> OrderItems { get; set; } = new List<OrderItemDetail>();
    public float TotalPrice { get; set; }
}