import { Response } from 'express';
import { ApiResponse, PaginatedData } from '../types/response.types';
import { AppError } from './errors.util';

function buildMeta(res: Response, extra?: Partial<ApiResponse['meta']>): ApiResponse['meta'] {
  return {
    requestId: (res.req as any).requestId || '',
    timestamp: new Date().toISOString(),
    ...extra,
  };
}

export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: buildMeta(res),
  };
  res.status(statusCode).json(response);
}

export function sendCreated<T>(res: Response, data: T): void {
  sendSuccess(res, data, 201);
}

export function sendNoContent(res: Response): void {
  res.status(204).json(buildMeta(res));
}

export function sendPaginated<T>(res: Response, data: PaginatedData<T>): void {
  const response: ApiResponse<PaginatedData<T>> = {
    success: true,
    data,
    meta: buildMeta(res, {
      page: data.page,
      limit: data.limit,
      total: data.total,
    }),
  };
  res.status(200).json(response);
}

export function sendError(res: Response, error: AppError): void {
  const response: ApiResponse = {
    success: false,
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
    },
    meta: buildMeta(res),
  };
  res.status(error.statusCode).json(response);
}
