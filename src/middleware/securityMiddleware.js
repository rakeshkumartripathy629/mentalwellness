// CUSTOM sanitizer to prevent MongoDB injection + XSS
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  for (let key in obj) {
    // block dangerous mongo operators
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
      continue;
    }

    // recursively sanitize nested objects
    if (typeof obj[key] === "object") {
      sanitizeObject(obj[key]);
    }

    // XSS basic protection
    if (typeof obj[key] === "string") {
      obj[key] = obj[key]
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/onerror=/gi, "")
        .replace(/onload=/gi, "");
    }
  }

  return obj;
};

const securityMiddleware = (app) => {
  app.use((req, res, next) => {
    sanitizeObject(req.body);
    sanitizeObject(req.params);
    sanitizeObject(req.query);
    next();
  });
};

module.exports = securityMiddleware;
