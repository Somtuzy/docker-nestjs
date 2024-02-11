import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ConfigsModule } from './config.module';

@Module({
  imports: [ConfigsModule, UsersModule, AuthModule, PostsModule],
  providers: [AppService],
  controllers: [AppController]
})

export class AppModule {
  constructor(private appService: AppService) {}
}