import ApplicationError from "./ApplicationError";

export default class EntityNotFoundException extends ApplicationError {
  constructor(message: string) {
    super(EntityNotFoundException.name, message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
