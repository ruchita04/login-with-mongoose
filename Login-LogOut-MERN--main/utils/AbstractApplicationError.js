class AbstractApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4)
      ? "failure"
      : "Internal server Error";
    this.beingHandled = true;
  }
}

export default AbstractApplicationError;

// it will be used when no such product found
