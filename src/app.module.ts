import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebModule } from './gateway/web.module';

@Module({
  imports: [WebModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
