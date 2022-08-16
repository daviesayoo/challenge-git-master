const sublevel = require('level-sublevel')

const db = sublevel(require('../db'), 'things')

module.exports = db
