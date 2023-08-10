import OrderDetailModel from "~root/Types/OrderDetail";

export enum OrderSort {
  ETA = "Date",
  JobName = "Jobs",
}

export interface OrderItemModel {
  id: number;
  status: OrderStatus;
  number: string;
  unread: boolean;
  name: string;
  random_number: string;
  delivery: Delivery;
}

interface Delivery {
  address: string;
  eta: string;
  type: string;
}

export interface OrderItemGroupType {
  [key: string]: OrderDetailModel[];
}

export enum EnumOrderType {
  Important,
  Delivery,
  Pickup,
  All,
}

export enum OrderStatus {
  Picking = "PICKING",
  OnItsWay = "ON IT'S WAY",
  OnTruck = "ON TRUCK, LEFT BRANCH",
  Delivered = "DELIVERED",
  ReadyToPickUp = "READY TO PICKUP",
  Missed = "MISSED",
  AssignedToVehicle = "ASSIGNED TO VEHICLE",
  Picked = "PICKED, READY FOR DELIVERY",
  Received = "ORDER RECEIVED",
}

export enum DeliveryTypes {
  StandardDelivery = "STANDARD DELIVERY",
  ExpressDelivery = "EXPRESS DELIVERY",
  PickupDelivery = "PICKUP DELIVERY",
}

export interface ISupplierObject {
  supplierName: string | undefined;
  supplierPODate: string | undefined;
}

export enum TruckTypes {
  noTruckPreference = "No preference",
  truckTipper = "Tipper",
  truckHiab = "Hiab",
}

export enum TruckTypePurpose {
  truckTipper = "Suitable for bulk material",
  truckHiab = "Suitable to access heights",
}

export enum SiteDetailType {
  siteSort = "Lift on site",
  siteBioHazard = "Hazards at the site",
  siteBan = "Restricted access",
}

export enum SiteDetailTypePurpose {
  siteSort = "Crane or heavy duty elevator",
  siteBioHazard = "Electric cables or electric poles",
  siteBan = "Narrow gate, off road access",
}
