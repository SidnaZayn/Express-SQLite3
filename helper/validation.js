import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);
const SECRET = 'secret_key'

const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};

const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};

const isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;
};

const empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

const generateUserToken = (id, name, username, isAdmin) => {
    const token = jwt.sign({
        id, name, username, isAdmin
    },
        SECRET, { expiresIn: '10m' });
    return token;
};

export {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    empty,
    generateUserToken,
    salt
};
