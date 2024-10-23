import postgres from 'postgres'

const sql = postgres({
    host: 'db',
    port: 5432,
    database: 'business',
    username: 'business',
    password: 'casual',
})

export { sql }