export class AddressValidationError extends Error {
    name: string;
    type: string;
    constructor() {
        super(`This is not a valid Algorand address`);
        this.name = "InvalidAddressError";
        this.type = "InvalidAddressError";
    }
}

export class InvalidNameError extends Error {
    name: string;
    type: string;
    constructor() {
        super(`The name must be between 3 and 64 characters`);
        this.name = "InvalidNameError";
        this.type = "InvalidNameError";
    }
}