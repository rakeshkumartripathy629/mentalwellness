const validate = (schema) => {
  return (req, res, next) => {
    const data = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: details,
      });
    }
    next();
  };
};

module.exports = validate;
