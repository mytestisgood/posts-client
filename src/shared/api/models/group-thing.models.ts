export interface GetGroupThingInProcessGetParameters {
  processId?: string;
  departmentId?: string;
}

export interface GetGroupThingInProcessGetResponse {
  block_sum?: number;
  num_file?: number;
  group_things_ids?: Array<string>;
  sent?: boolean;
  code?: number;
}