interface Order {
    id?:string
}
enum GetOrderParams{
    none = 'none'
}
enum UpdateOrderParams{}
export {Order, GetOrderParams, UpdateOrderParams}