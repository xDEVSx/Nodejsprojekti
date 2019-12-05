const EventEmitter = require('events');
const uuid = require('uuid');

class Logger extends EventEmitter {
    log(msg) {
    // Call event
    this.emit('viesti', { id: uuid.v4(), msg });
    }
}

// module.exports = Logger;

const logger = new Logger();

logger.on('message', data => console.log('Soitettiin kuutelija:D', data));

logger.log('Terve vuan');