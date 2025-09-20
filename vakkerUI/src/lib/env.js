// Bridge for the @env alias used in tsconfig/babel
// Exports ClientEnv so app code can import configuration safely
const { ClientEnv } = require('../../env');
module.exports = ClientEnv;
