import mysql from 'mysql2/promise'

/**
 * SINGLETON DATABASE 
 * -> represents the main database instance being used in this application
 */   

class Database { 
    private static instance: Database;
    private static pool: mysql.Pool;

    constructor() { 
        Database.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        })
    }

    /**
     * GET database instance
     */
    public static getInstance(): Database { 
        if (!Database.instance) 
            Database.instance = new Database();
        
        return Database.instance;
    }

    /**
     * GET database connection
     */
    public static getConnection(): Promise<mysql.PoolConnection> { 
        if (!Database.pool) 
            Database.getInstance();

        return Database.pool.getConnection();
    }

    /**
     * Query the database
     * @param query 
     * @param values 
     * @returns 
     */
    public async query<T>(query:string, values?: any[]) { 
        const [rows] = await Database.pool.query(query, values);
        return rows as T;
    }
}

export default Database;