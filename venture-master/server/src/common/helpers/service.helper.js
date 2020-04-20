/** verify and sanitize object */
function verifyAndSanitize(values, props, optional = []) {
  if (!Object.keys(values).length) {
    return { errors: 'data not sent', sanitized: null };
  }

  const [errors, sanitized] = [[], {}];
  props.forEach(prop => {
    // property not sent and isn't optional
    if (!values[prop] && optional.every(opt => opt !== prop)) {
      errors.push({ prop, message: `${prop} is required` });
    } else {
      // remove props unexpected
      sanitized[prop] = values[prop];
    }
  });

  return { errors: errors.length ? errors : null, sanitized };
}

/** service http response */
function serviceResponse(status, response) {
  return { status, response };
}

/** only values allowed */
function equalsTo(value, allowed) {
  return allowed.some(a => a === value);
}

module.exports = { verifyAndSanitize, serviceResponse, equalsTo };
