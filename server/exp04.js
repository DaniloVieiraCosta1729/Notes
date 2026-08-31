const fs = require('node:fs');
const {join} = require('path');

const page = join(__dirname, '../index.html');
fs.stat(
    page,
    (err, stats) => {
        if (err) {
            console.error(err);
        }

        console.log(stats.birthtime);
        console.log(stats.size);
    }
);