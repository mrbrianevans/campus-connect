import { Pool } from 'pg'

export const getDatabasePool = () => {
    return new Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.POSTGRES_DB,
        port: parseInt(process.env.DB_PORT ?? '5432'),
        ssl: false
    })
}
