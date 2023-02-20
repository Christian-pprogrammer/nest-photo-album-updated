import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoInput } from './dto/create-photo.input';
import { UpdatePhotoInput } from './dto/update-photo.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo } from './entities/photo.entity';
import { createWriteStream, unlinkSync } from 'fs';
import path, { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UPLOAD_DIR } from '../../constants/storage';
import { base64_encode } from '../../helpers/base64_encode';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {}

  async create(createPhotoInput: CreatePhotoInput) {
    const { createReadStream, filename } = await createPhotoInput.image;
    return new Promise((resolve) => {
      const img_url = join(
        UPLOAD_DIR,
        `./${path.parse(filename).name}-${uuidv4()}${path.parse(filename).ext}`
      );
      createReadStream()
        .pipe(createWriteStream(img_url))
        .on('finish', async () => {
          const newPhoto = new this.photoModel({
            ...createPhotoInput,
            photourl: img_url,
          });
          return resolve(await newPhoto.save());
        })
        .on('error', () => {
          throw new BadRequestException('Could not save image');
        });
    });
  }

  findAll(albumid: string) {
    return this.photoModel.find({ albumid });
  }

  async findOne(id: string) {
    const photo = await this.photoModel.findById(id);
    photo.base64_encoded = base64_encode(photo.photourl);
    return photo;
  }

  async update(id: string, updatePhotoInput: UpdatePhotoInput) {
    const { createReadStream, filename } = await updatePhotoInput.image;
    if (updatePhotoInput.image)
      return new Promise((resolve) => {
        const img_url = join(
          UPLOAD_DIR,
          `./${path.parse(filename).name}-${uuidv4()}${
            path.parse(filename).ext
          }`
        );
        createReadStream()
          .pipe(createWriteStream(img_url))
          .on('finish', async () => {
            return resolve(
              this.photoModel.findByIdAndUpdate(id, {
                ...updatePhotoInput,
                photo_url: img_url,
              })
            );
          })
          .on('error', () => {
            throw new BadRequestException('Could not save image');
          });
      });
    return this.photoModel.findByIdAndUpdate(id, updatePhotoInput);
  }

  async remove(id: string) {
    try {
      const deleted_photo = await this.photoModel.findByIdAndDelete(id);
      unlinkSync(deleted_photo.photourl);
      return deleted_photo;
    } catch (error) {
      throw new BadRequestException('Could not delete photo');
    }
  }
}
