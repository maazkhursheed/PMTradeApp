export interface FailureRequestParam {
  action: any;
  response: any;
}

export enum RequestedTime {
  ANYTIME = "ANYTIME",
  AM = "AM",
  PM = "PM",
  SPECIFIC_TIME = "Specific Time",
}
