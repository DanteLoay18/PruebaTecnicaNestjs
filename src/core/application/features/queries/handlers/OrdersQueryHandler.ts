// import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
// import { Paginated } from "../../../utils/Paginated";
// import { OrdersQuery } from "../OrdersQuery";

// @QueryHandler(OrdersQuery)
// export class OrdersQueryHandler implements IQueryHandler<OrdersQuery>{

//     constructor(private purchase: PurchaseUseCases) { }

//     execute(query: OrdersQuery): Promise<Paginated<Order>> {
//         return this.purchase.getOrders(query)
//     }

// }