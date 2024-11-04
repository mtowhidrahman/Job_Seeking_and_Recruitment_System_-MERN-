export const catchAsyncError = (loginFunction) => {
  return (req, res, next) => {
    Promise.resolve(loginFunction(req, res, next)).catch(next);
  };
};
