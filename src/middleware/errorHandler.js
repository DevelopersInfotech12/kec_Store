export class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export function errorHandler(error) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return {
      success: false,
      error: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error.name === 'ValidationError') {
    return {
      success: false,
      error: 'Validation failed',
      details: error.errors,
      statusCode: 400,
    };
  }

  if (error.name === 'CastError') {
    return {
      success: false,
      error: 'Invalid ID format',
      statusCode: 400,
    };
  }

  return {
    success: false,
    error: 'Internal server error',
    statusCode: 500,
  };
}

export function asyncHandler(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      const errorResponse = errorHandler(error);
      return Response.json(errorResponse, { status: errorResponse.statusCode });
    }
  };
}