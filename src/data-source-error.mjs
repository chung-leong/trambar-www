class DataSourceError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export {
  DataSourceError,
};
