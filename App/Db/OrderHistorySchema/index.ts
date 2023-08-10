const OrderHistorySchema = {
  name: "OrderHistory",
  primaryKey: "token",
  properties: {
    orderId: "string",
    poNumber: "string",
    date: "string",
    time: "string",
    token: "string",
    jobAccount: "string",
    clientId: "string",
    branchId: "string",
    fulfilmentBranchId: "string",
    status: "string",
    accountName: "string",
    expiryDate: "string",
    resumeCount: "string",
  },
};

export default OrderHistorySchema;

export enum OrderHistoryStatus {
  QrCodeGenerate = "Begin Order",
  QrCodeGeneratePrev = "Scan QR code",
  InProgress = "Collecting Order",
  InProgressPrev = "Order in progress",
  InReview = "Review Order",
  InReviewPrev = "Review order",
  PendingConfirmation = "Pending confirmation",
  Confirmed = "Order Complete",
  ConfirmedPrev = "Order completed",
  Cancelled = "Cancelled",
  Expired = "Expired",
  Resume = "Begin Order",
}

export interface IOrderHistoryObject {
  orderId?: string;
  poNumber?: string | unknown;
  date?: string;
  time?: string;
  accountName?: string;
  expiryDate?: string;
  token: string;
  branchId?: string | unknown;
  fulfilmentBranchId?: string | unknown;
  jobAccount?: string | unknown;
  clientId?: string | unknown;
  status?: OrderHistoryStatus;
  resumeCount?: string | unknown;
}
