import { Pool, Client, PoolConfig } from "pg";



export class PostgresConnection {

    private static instance: PostgresConnection;
    private pool: Pool;
    public singletonVerify: number;
    constructor() {
        if (PostgresConnection.instance) {
            return PostgresConnection.instance;
        }

        PostgresConnection.instance = this;
        let config: PoolConfig = {
            user: process.env.BD_USER,
            password: process.env.BD_PASSWORD,
            host: process.env.BD_HOST,
            port: parseInt(process.env.BD_PORT),
            database: process.env.BD_NAME,
            ssl: true,
        }

        if (process.env.NODE_ENV === 'production') {
            config.ssl = {
                rejectUnauthorized: false
            }
        }

        this.singletonVerify = Math.random()
        this.pool = new Pool(config)

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on DB connection client', err)
            process.exit(-1)
        })
    }

    public static getInstance() {
        return new PostgresConnection()
    }

    public async getClient() {
        return await this.pool.connect()
    }

    public async getPool() {
        return this.pool;
    }


}
