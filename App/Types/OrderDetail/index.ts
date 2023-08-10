import { OrderStatus } from "~root/Types/OrderItem";

export default interface OrderDetailModel {
  orderNumber: string;
  orderId: string;
  fulfilmentType: string;
  fulfilmentBranchId: string;
  poNumber: string;
  customerId: string;
  status: OrderStatus;
  delivery: Delivery;
  original: any;
  requestDate: string;
  pickupTime: string;
  orderItems: OrderProductItemModel[];
  headerDetails: {
    isDelivered: boolean;
    isEstimated: boolean;
    DSP: string;
    text: string;
  };
  jobDetails: {
    jobId: string;
    processor: {
      By: string;
      When: string | number;
      Branch: string;
    };
    jobName: string;
    jobPoNumber: string;
    jobDeliveryType: string;
  };
  siteContact: {
    Name: string;
    MobileNumber: string;
    EmailAddress: string;
  };
  supplier: {
    supplierName: string;
    supplierPODate: string;
  };
}

interface Delivery {
  address: string;
  site_requirements: string[];
  truck_requirements: string[];
  delivery_requirements: string;
}

export interface OrderProductItemModel {
  description: string;
  qtyOrdered: string;
  unitOfMeasure: string;
  sku: string;
}

// For api call
export interface JopDetailParams {
  customerId: string;
  JobAccountIds?: string;
  TransactionId?: string;
  IncludeClosedOrders?: string;
  orderNumber?: string;
  IncludeOrderDetails?: string;
  BranchID: string;
  orderId: string;
}
