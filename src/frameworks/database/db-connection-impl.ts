import { DataSource } from 'typeorm';
import { DbConnection } from '../../adapters/gateways/db/db-connection';
import { MysqlOrmAdapter } from '../database/mysql-orm-adapter'

export class DbConnectionImpl implements DbConnection {

    public getConnection(): DataSource {
        const orm = MysqlOrmAdapter.getInstance();
        return orm.database
    }
}