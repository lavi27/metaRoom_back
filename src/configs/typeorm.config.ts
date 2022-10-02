import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "lavi",
    "password": "qwerty2007@",
    "database": "metaRoom",
    "entities": [
        __dirname + '/../**/*.entity{.ts,.js}'
    ]
};