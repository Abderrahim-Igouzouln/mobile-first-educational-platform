export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResult {
  skip: number;
  take: number;
}

export function parsePagination(query: { page?: string; limit?: string }): PaginationParams {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10)));
  return { page, limit };
}

export function buildPagination(page: number, limit: number, total: number): PaginationResult & { total: number; totalPages: number } {
  return {
    skip: (page - 1) * limit,
    take: limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
