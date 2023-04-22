const catchErrorApi = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => next(error));
};

export default catchErrorApi;
