import { CreateTodoInput, UpdateTodoInput } from '../models/Todo.js';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateCreateTodo(data: unknown): {
  isValid: boolean;
  errors: ValidationError[];
  data?: CreateTodoInput;
} {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: [{ field: 'body', message: 'Request body is required' }],
    };
  }

  const body = data as Record<string, unknown>;

  // Validate title
  if (!body.title) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (typeof body.title !== 'string') {
    errors.push({ field: 'title', message: 'Title must be a string' });
  } else if (body.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title cannot be empty' });
  } else if (body.title.length > 200) {
    errors.push({ field: 'title', message: 'Title must be less than 200 characters' });
  }

  // Validate description (optional)
  if (body.description !== undefined) {
    if (typeof body.description !== 'string') {
      errors.push({ field: 'description', message: 'Description must be a string' });
    } else if (body.description.length > 1000) {
      errors.push({ field: 'description', message: 'Description must be less than 1000 characters' });
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: [],
    data: {
      title: (body.title as string).trim(),
      description: body.description ? (body.description as string).trim() : undefined,
    },
  };
}

export function validateUpdateTodo(data: unknown): {
  isValid: boolean;
  errors: ValidationError[];
  data?: UpdateTodoInput;
} {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: [{ field: 'body', message: 'Request body is required' }],
    };
  }

  const body = data as Record<string, unknown>;
  const updateData: UpdateTodoInput = {};

  // Validate title (optional for update)
  if (body.title !== undefined) {
    if (typeof body.title !== 'string') {
      errors.push({ field: 'title', message: 'Title must be a string' });
    } else if (body.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Title cannot be empty' });
    } else if (body.title.length > 200) {
      errors.push({ field: 'title', message: 'Title must be less than 200 characters' });
    } else {
      updateData.title = body.title.trim();
    }
  }

  // Validate description (optional)
  if (body.description !== undefined) {
    if (body.description !== null && typeof body.description !== 'string') {
      errors.push({ field: 'description', message: 'Description must be a string or null' });
    } else if (typeof body.description === 'string' && body.description.length > 1000) {
      errors.push({ field: 'description', message: 'Description must be less than 1000 characters' });
    } else {
      updateData.description = body.description === null ? undefined : (body.description as string)?.trim();
    }
  }

  // Validate completed (optional)
  if (body.completed !== undefined) {
    if (typeof body.completed !== 'boolean') {
      errors.push({ field: 'completed', message: 'Completed must be a boolean' });
    } else {
      updateData.completed = body.completed;
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Check if at least one field is provided
  if (Object.keys(updateData).length === 0) {
    return {
      isValid: false,
      errors: [{ field: 'body', message: 'At least one field must be provided for update' }],
    };
  }

  return {
    isValid: true,
    errors: [],
    data: updateData,
  };
}
