import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ConfigsModule } from './configs/config.module';
import { NotFoundMiddleware } from './auth/middlewares/not-found.middleware';

@Module({
  imports: [ConfigsModule, UsersModule, AuthModule, PostsModule],
  providers: [AppService],
  controllers: [AppController]
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NotFoundMiddleware).forRoutes('*');
  }
}