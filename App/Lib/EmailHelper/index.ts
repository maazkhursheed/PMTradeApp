/**
 * @description This file contains the email param templates for different order types
 */

export interface IPlaceOrderTemplateParam {
  accountName: string;
  srcId: string;
  customerPoNo: string;
  deliveryDate: string;
  order: any;
  deliveryAddress: string;
  userName: string;
  phone: string;
  deliveryType: string;
  instruction: string;
  email?: string;
  orderPlacedForAccount: string;
}

export interface IPlaceOrderTemplateParamCustomer {
  accountHolderName: string;
  customerPoNo: string;
  order: any;
  deliveryAddress: string;
  appUserName: string;
  instruction: string;
  jobName: string;
  jobAddress: string;
  branchDetails: any;
  subTotal: any;
  permission: any;
  deliveryContactName: string;
  deliveryContactPhone: string;
}

export interface IForgotPasswordTemplate {
  email: string;
  userName: string;
  phone: string;
}

export interface IChangeDateTemplate {
  requestedDate: Date | undefined;
  previousDate: Date | undefined;
  userNotes: string;
  userName: string;
  address: string;
  orderNo: string;
  jobName?: string;
  order?: any;
  instruction?: string;
  branchDetails?: string;
}

export interface IChangeItemTemplate {
  orderNo: string;
  accountName?: string;
  jobNo?: string;
  invoiceTo?: string;
  customerMsg: string;
  originalOrder: any;
  instruction?: string;
  deliveryAddress?: string;
  userName?: string;
  jobName?: string;
  branchDetails?: string;
  phone?: string;
  email?: string;
}

export interface IChangeStatusTemplate {
  userName: string;
  orderNo: string;
  contact: string;
  email: string;
  jobNo: string;
  accountName: string;
  customerMsg: string;
}

export interface IArchiveTemplate {
  userName: string;
  email: string;
  jobAccount: string;
  jobNo: string;
}
