import pg_promise, { PreparedStatement } from 'pg-promise'

import { config } from 'dotenv'

const pgp = pg_promise({ noWarnings: true })

config()
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

            const getIdStatement = new PreparedStatement({
                name: 'get-user-id',
                text: `SELECT u.id
                       FROM Users u
                       WHERE u.username = $1
                         AND u.email = $2`,
                values: [username, email]
            })

            const result = await db
                .one(getIdStatement)
                .then((result) => {
                    res.status(200).json(result)
                })
                .catch((err) => {
                    console.log(err)
                    if (err.code == pgp.errors.queryResultErrorCode.noData) {
                        res.status(404).json({
                            message: 'Could not find requested user'
                        })
                    } else {
                        res.status(500).json({
                            message: 'Unknown server error'
                        })
                    }
                })
        }
    } catch (error) {
        res.status(500).send({
            message: 'Unknown server error, please contact an administrator',
            error: error
        })
    }
}
