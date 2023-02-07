import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosResolver } from './photos.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './entities/photo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
  ],
  providers: [PhotosResolver, PhotosService],
  exports: [PhotosService],
})
export class PhotosModule {}
