import jwt, { decode } from 'jsonwebtoken';

const SECRET = 'secret_key'

const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization;
    let errorMessage = {}
    if (token === undefined) {
        errorMessage.error = 'Token not provided';
        return res.status(401).send(errorMessage);
    } else {
        if (token.indexOf('Bearer') > -1) {
            token = token.split(' ')[1];
        }
    }
    try {
        let tokenWithoutBearer = token;
        const decoded = jwt.verify(tokenWithoutBearer, SECRET);
        req.user = {
            id: decoded.id,
            name: decoded.name,
            username: decoded.username,
            isAdmin: decoded.isAdmin,
        };

        next();
    } catch (error) {
        console.log(error)
        errorMessage.error = 'Authentication Failed';
        return res.status(401).send(errorMessage);
    }
};

export default verifyToken