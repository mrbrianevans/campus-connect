import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import validation from '../modules/validation'

import bcrypt from 'bcrypt'
import pg_promise, { PreparedStatement } from 'pg-promise'

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

/**
 * Returns the user credentials, and returns the information for the session
 * @param {Object} credentials
 */
async function checkCredentials(
    credentials: Record<'username' | 'password', string> | undefined
) {
    const db = pgp(connectionObject)
    const username = credentials?.username ?? ''
    const password = credentials?.password ?? ''

    // Validates that the username and password are of correct length
    if (!validation.validateUsername(username)) {
        return null
    }
    if (!validation.validatePassword(password)) {
        return null
    }

    // Login statement to select password and email.
    const loginStatement = new PreparedStatement({
        name: 'login-user',
        text: 'SELECT pass, email FROM Users WHERE username = $1',
        values: [username]
    })

    // Send the statement off,
    return await db
        .one(loginStatement)
        .then((result) => {
            // If the hash matches, send back a success.
            if (bcrypt.compareSync(password, result.pass)) {
                // Return the session user object
                return { name: username, email: result.email }
            } else {
                // Login rejected.
                return null
            }
        })
        .catch((reason) => {
            // Login rejected.
            return null
        })
}

export default NextAuth({
    providers: [
        Credentials({
            type: 'credentials',
            id: 'username-login',
            name: '',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Username'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials) => {
                return checkCredentials(credentials)
            }
        })
    ]
})
