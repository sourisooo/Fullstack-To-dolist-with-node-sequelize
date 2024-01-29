function notFound(req, res, next) {
    const error = new Error('Not found');
    error.statusCode = 404;

    next(error);
}

// * cette fonction accepte une méthode (fn) en paramètre
function catchErrors(fn) {
    // * Cette fonction doit exécuter la méthode d'un contrôleur, et détecter les erreurs s'il y en a
    // * Au cas ou on rencontre une erreur, on la gère ici
    return async function (req, res, next) {
        try {
            await fn(req, res, next);
        } catch (error) {
            // * Quand on appelle next avec un argument, express lève une erreur
            next(error);
        }
    };
}

// * Un middleware de gestion d'erreur dans express, accepte 4 params dont le premier est `error`
function devErrors(error, req, res, next) {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({ error: error.message, trace: error.stack });
}

function prodErrors(error, req, res, next) {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({ error: error.message });
}

module.exports = { catchErrors, notFound, devErrors, prodErrors };
