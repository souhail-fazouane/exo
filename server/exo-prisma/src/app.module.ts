import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserService} from "./user.service";
import {MovieService} from "./movie.service";
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,UserService,MovieService,PrismaService],
})
export class AppModule {}
