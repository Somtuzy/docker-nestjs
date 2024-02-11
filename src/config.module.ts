import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { appConfig, databaseConfig, jwtConfig } from './config';

@Module({
    imports: [
        // for all configurations including environmental variables
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig, jwtConfig]
          }),

        // passing configurations to start the database
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
              uri: config.get<string>('database.url'),
              dbName: config.get<string>('database.name'),
        
              // await config.get<string>('database.connect')(uri, dbName)
            })
        })
    ],
    // exports: [MongooseModule, ConfigModule]
})

export class ConfigsModule {}