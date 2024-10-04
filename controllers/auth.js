const loggedin = (req, res, next) => {
    if (!req.cookies.userRegistered) {
        return next();  // Если токен отсутствует, продолжаем выполнение
    }
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        db.query('SELECT * FROM user WHERE id = ?', [decoded.id], (err, result) => {
            if (err || !result.length) {
                return next();  // Если есть ошибка или пользователь не найден
            }
            req.user = result[0];
            return next();  // Продолжаем выполнение
        });
    } catch (err) {
        return next();  // Если произошла ошибка верификации, продолжаем выполнение
    }
};

module.exports = loggedin;
