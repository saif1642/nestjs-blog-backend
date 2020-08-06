import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConnectionService } from './db-connection.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass:DbConnectionService
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
