import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PassengerModule } from './passenger/passenger.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
  }), MongooseModule.forRoot(process.env.URI_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    retryWrites: true
  }), UsersModule, PassengerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
