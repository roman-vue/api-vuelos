import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
  }), MongooseModule.forRoot(process.env.URI_MONGODB, {
    useCreateIndex: true,
    useFindAndModify: false
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
