import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import * as process from 'process';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './users/user-model';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {Document} from "./document/document-model";
import {DocumentModule} from "./document/document.module";


@Module({

    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_NAME,
            models: [User, Document],
            autoLoadModels: true,
        }),
        UsersModule,
        AuthModule,
        DocumentModule
    ],
})
export class AppModule {
}
