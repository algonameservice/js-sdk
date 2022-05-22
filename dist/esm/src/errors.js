export class AddressValidationError extends Error {
    name;
    type;
    constructor() {
        super(`This is not a valid Algorand address`);
        this.name = "InvalidAddressError";
        this.type = "InvalidAddressError";
    }
}
export class InvalidNameError extends Error {
    name;
    type;
    constructor() {
        super(`The name must be between 3 and 64 characters and must only contain a-z and 0-9 characters`);
        this.name = "InvalidNameError";
        this.type = "InvalidNameError";
    }
}
export class NameNotRegisteredError extends Error {
    name;
    type;
    constructor(name) {
        super(`Name ${name}.algo is not registered`);
        this.name = "NameNotRegisteredError";
        this.type = "NameNotRegisteredError";
    }
}
export class IncorrectOwnerError extends Error {
    name;
    type;
    constructor(name, address) {
        super(`Name ${name}.algo is not owned by ${address}`);
        this.name = "IncorrectOwnerError";
        this.type = "IncorrectOwnerError";
    }
}
export class PropertyNotSetError extends Error {
    name;
    type;
    constructor(property) {
        super(`Property ${property} is not set`);
        this.name = "PropertyNotSetError";
        this.type = "PropertyNotSetError";
    }
}
