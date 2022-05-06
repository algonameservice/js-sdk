(() => {
  // src/errors.ts
  var AddressValidationError = class extends Error {
    name;
    type;
    constructor() {
      super(`This is not a valid Algorand address`);
      this.name = "InvalidAddressError";
      this.type = "InvalidAddressError";
    }
  };
  var InvalidNameError = class extends Error {
    name;
    type;
    constructor() {
      super(`The name must be between 3 and 64 characters and must only contain a-z and 0-9 characters`);
      this.name = "InvalidNameError";
      this.type = "InvalidNameError";
    }
  };
  var NameNotRegisteredError = class extends Error {
    name;
    type;
    constructor(name) {
      super(`Name ${name} is not registered`);
      this.name = "NameNotRegisteredError";
      this.type = "NameNotRegisteredError";
    }
  };
  var IncorrectOwnerError = class extends Error {
    name;
    type;
    constructor(name, address) {
      super(`Name ${name}.algo is not owned by ${address}`);
      this.name = "IncorrectOwnerError";
      this.type = "IncorrectOwnerError";
    }
  };
})();
//# sourceMappingURL=errors.global.js.map