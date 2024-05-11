import { DataSource } from "typeorm"
export interface DbConnection {
    getConnection(): DataSource;
}