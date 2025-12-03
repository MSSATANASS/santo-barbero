// Minimal DOMException polyfill using the native implementation when available
let BaseDOMException = globalThis.DOMException;

if (!BaseDOMException) {
  BaseDOMException = class DOMException extends Error {
    constructor(message = '', name = 'Error') {
      super(message);
      this.name = name;
      this.code = 0;
    }
  };
}

class NodeDOMException extends BaseDOMException {
  constructor(message = '', name = 'Error') {
    super(message, name);
  }
}

module.exports = NodeDOMException;
module.exports.default = NodeDOMException;
module.exports.DOMException = NodeDOMException;
