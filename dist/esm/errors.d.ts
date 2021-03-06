export declare class AddressValidationError extends Error {
    name: string;
    type: string;
    constructor();
}
export declare class InvalidNameError extends Error {
    name: string;
    type: string;
    constructor();
}
export declare class NameNotRegisteredError extends Error {
    name: string;
    type: string;
    constructor(name: string);
}
export declare class IncorrectOwnerError extends Error {
    name: string;
    type: string;
    constructor(name: string, address: string);
}
export declare class PropertyNotSetError extends Error {
    name: string;
    type: string;
    constructor(property: string);
}
//# sourceMappingURL=errors.d.ts.map