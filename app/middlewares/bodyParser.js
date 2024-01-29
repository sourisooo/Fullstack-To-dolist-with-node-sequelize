const sanitizeHtml = require('sanitize-html');

function bodySanitizer(req, res, next) {
    Object.keys(req.body).forEach((key) => {
        if (typeof req.body[key] === 'string') {
            req.body[key] = sanitizeHtml(req.body[key]);
        }
    });

    next();
}

module.exports = { bodySanitizer };
