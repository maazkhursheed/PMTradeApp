export interface ConnectTradeParams {
  email: string;
  accountId: string;
  mobileNumber: string;
  branchId: string; // Ignore By Hybris Team - Needs to be updated.
}

export interface ConnectOwnerTradeParams {
  email: string;
  accountId: string;
  branchId: string;
  isAccountOwner: boolean;
}

export interface ApplyVoucherParams {
  voucherId: string;
}
