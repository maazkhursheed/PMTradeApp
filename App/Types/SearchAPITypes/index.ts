export interface IListRequestParam {
  userID?: string;
  listName: string;
}

export interface IItemListRequestParam extends IListRequestParam {
  skuList: string[];
}

export interface ISearchSolrParams {
  query: string;
  currentPage?: string;
}

export interface IConfirmOrderRequestBody {
  transactionId?: string;
  sourceTransactionId?: string;
  transactionSource?: "YardAppSTC";
  parentBranchId?: string;
  fulfilmentBranchId?: string;
  accountCode?: string;
  orderId?: string;
  orderType?: string;
  state?: string;
}
