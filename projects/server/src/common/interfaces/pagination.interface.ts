export interface IPagination extends IPaginationOptions {
  page: number;
  limit: number;
  totalDocuments: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface IPaginationOptions {
  page: number;
  limit: number;
}
