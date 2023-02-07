import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AlbumsModule } from '../albums/albums.module';
import { UsersModule } from '../users/users.module';
import { PhotosModule } from '../photos/photos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/photo-album/src/schema.gql'),
    }),
    MongooseModule.forRoot('mongodb://localhost/photo-album', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    AlbumsModule,
    UsersModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
