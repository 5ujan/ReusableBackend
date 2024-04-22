const errorHandler = async (req, res, next) => {
  try {
    await next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;