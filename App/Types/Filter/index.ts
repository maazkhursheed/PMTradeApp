import { OrderSort, OrderStatus } from "~root/Types/OrderItem";

export default interface FilterModel {
  sort: OrderSort;
  status: OrderStatus[];
  // deliveryTypes: Array<DeliveryTypes>
}
