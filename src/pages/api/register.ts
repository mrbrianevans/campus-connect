import pg_promise, { PreparedStatement } from 'pg-promise'

import bcrypt from 'bcrypt'
import validation from './modules/validation'

const pgp = pg_promise({ noWarnings: true })
const connectionObject = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    ssl: {
        rejectUnauthorized: false,
        requestCert: false
    }
}

const db = pgp(connectionObject)

export default async (req, res) => {
    try {
        if (req.method === 'POST') {
            const username = req.body.username
            const email = req.body.email
            const firstname = req.body.firstname
            const lastname = req.body.lastname

            // validate username, email, firstname, lastname and password.
            if (!validation.validateUsername(username)) {
                res.status(422).json({ type: 'validation', field: 'username' })
                return
            }
            if (!validation.validateName(firstname)) {
                res.status(422).json({ type: 'validation', field: 'firstname' })
                return
            }
            if (!validation.validateName(lastname)) {
                res.status(422).json({ type: 'validation', field: 'lastname' })
                return
            }
            if (!validation.validateEmail(email)) {
                res.status(422).json({ type: 'validation', field: 'email' })
                return
            }
            if (!validation.validatePassword(req.body.pass)) {
                res.status(422).json({ type: 'validation', field: 'password' })
                return
            }

            // hash the password with bcrypt using 10 rounds
            const passwordHash = bcrypt.hashSync(req.body.pass, 10)

            // prepared statement to input to PostgreSQL
            const registerStatement = new PreparedStatement({
                name: 'register-user',
                text: 'INSERT INTO Users (username, firstname, surname, pass, email) values ($1, $2, $3, $4, $5)',
                values: [username, firstname, lastname, passwordHash, email]
            })

            const result = await db
                .none(registerStatement)
                .then((reason) => {
                    // registered
                    res.status(200).json({ message: 'Successfully registered' })
                })
                .catch((err) => {
                    // Error code for when field values are already taken.
                    if (err.code == 23505) {
                        res.status(422).json({
                            type: 'preexisting',
                            message: 'Username or email is already registered'
                        })
                    } else {
                        res.status(500).json({
                            message:
                                'Unknown server error, please contact an administrator'
                        })
                    }
                })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Unknown server error, please contact an administrator',
            error: error
        })
    }
}
