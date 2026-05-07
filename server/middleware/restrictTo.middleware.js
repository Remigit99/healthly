

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array, e.g., ['parent']
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You do not have permission to perform this action"
      });
    }
    next();
  };
};