import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ModelsModule } from 'src/models/models.module';
import { PostsController } from './posts.controller';

@Module({
  imports: [ModelsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
