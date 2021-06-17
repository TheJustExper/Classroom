const msgpack = require("msgpack-lite");

module.exports = class {
    constructor(opcode) {
        this.opcode = opcode;
    }
}