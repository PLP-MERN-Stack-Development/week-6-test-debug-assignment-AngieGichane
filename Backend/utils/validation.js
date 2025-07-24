const validateBugInput = (data) => {
  let errors = {};
  let isValid = true;

  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
    isValid = false;
  } else if (data.title.length > 100) {
    errors.title = 'Title cannot be more than 100 characters';
    isValid = false;
  }

  if (!data.description || data.description.trim() === '') {
    errors.description = 'Description is required';
    isValid = false;
  } else if (data.description.length > 500) {
    errors.description = 'Description cannot be more than 500 characters';
    isValid = false;
  }

  if (data.status && !['open', 'in-progress', 'resolved'].includes(data.status)) {
    errors.status = 'Invalid status value';
    isValid = false;
  }

  if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
    errors.priority = 'Invalid priority value';
    isValid = false;
  }

  return { errors, isValid };
};

module.exports = { validateBugInput };