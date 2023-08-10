// For api call

export interface EstimatesListByIdParams {
  estimateNumber: string;
  pageNo?: string;
  numberOfLines?: string;
}

export interface EstimatesDetailParams extends EstimatesListByIdParams {
  sectionId: string;
  sectionDescription: string;
}
