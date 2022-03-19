import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGO_URI'),
      dbName: configService.get('MONGODB_DB_NAME'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    inject: [ConfigService],
  }),],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
