const path = require('path');

// process.mainMoudle is deprecated
module.exports = path.dirname(require.main.filename);
