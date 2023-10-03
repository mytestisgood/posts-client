export interface StatusGetParameters {
  opswatId?: string;
  project?: string;
}

export interface StatusGetResponse {
  message?: string;
  opswatId?: string;
  percentage?: number;
}

export interface UploadPostResponse {
  message?: string;
  opswatId?: string;
}