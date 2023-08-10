export interface InboxMessage {
  alert: string;
  deleted: boolean;
  endDateUtc: string;
  id: string;
  keys: Keys;
  read: boolean;
  sendDateUtc: string;
  subject: string;
  title: string;
  url: string;
}

export interface Keys {
  BranchID: string;
  FBranchID: string;
  JobAccountID: string;
  NotifyType: string;
  OrderNumber: string;
  PDONumber: string;
  TradeAccountID: string;
}
