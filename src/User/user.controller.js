import db from "../../db.js";
import { comparePassword, generateUserToken } from "../../helper/validation.js";

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM user WHERE username = ?';
        const param = [username];
        db.all(query, param, (err, rows) => {
            if (err) {
                res.status(400).json({ message: err.message });
                return;
            }
            if (!rows || rows.length < 1) {
                errorMessage.error = "username or password wrong";
                return res.status(500).send(errorMessage);
            } else {
                let user = rows[0];
                if (!comparePassword(user.password, password)) {
                    errorMessage.error = "username or password wrong";
                    return res.status(500).send(errorMessage);
                }

                const isAdmin = user.role_id === 1;

                const token = generateUserToken(
                    user.id,
                    user.name,
                    user.username,
                    isAdmin,
                );

                delete user.password

                res.status(200).send({
                    success: true,
                    token,
                    isAdmin,
                    user
                })
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const testToken = (req, res) => {
    try {
        return res.status(200).send({
            message: "huaduw"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const getUsers = async (req, res) => {
    const { isAdmin } = req.user;
    const { search } = req.query;
    try {
        if (!isAdmin) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized"
            })
        };

        let query = 'SELECT * FROM user INNER JOIN role ON user.role_id = role.id';
        let param = [];
        if (search) {
            query += ` WHERE name LIKE '%' || ? || '%' OR username LIKE '%' || ? || '%'`;
            param.push(search);
            param.push(search);
        }

        db.all(query, param, (err, rows) => {
            if (err) {
                res.status(400).json({ message: err.message });
                return;
            }
            return res.status(200).send({
                success: true,
                data: rows
            })
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export {
    login,
    testToken,
    getUsers
}