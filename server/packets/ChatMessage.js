const msgpack = require("msgpack-lite");

module.exports = class extends Packet {
    constructor() {
        super(10);
    }

    build() {
        const buf = msgpack.encode({
            opcode: this.opcode,
        });
    
        return buf;
    }
}

