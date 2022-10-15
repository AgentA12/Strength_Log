const { ApolloError } = require("apollo-server-errors");

module.exports =  class CustomError extends ApolloError {
  constructor(message) {
    super(message);

    Object.defineProperty(this, "message", { value: "error" });
  }
}
