// Middleware para chequear rol en JWT (ej: admin)
module.exports = function requiredRole(role) {
    return (req, res, next) => {
        if (!req.usuarioRol) {
            return res.status(401).json({ message: 'No autenticado' });
        }
        if (req.usuarioRol !== role) {
            return res.status(403).json({ message: 'No tienes permisos para esta operación' });
        }
        next();
    };
};
