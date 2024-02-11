import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, usersSchema, Posts, postsSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: usersSchema },
      { name: Posts.name, schema: postsSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ModelsModule {}