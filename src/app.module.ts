import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConnectionService } from './db-connection.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass:DbConnectionService
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
