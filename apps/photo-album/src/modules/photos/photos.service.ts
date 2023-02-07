import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoInput } from './dto/create-photo.input';
import { UpdatePhotoInput } from './dto/update-photo.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {}

  async create(createPhotoInput: CreatePhotoInput) {
    const existPhoto = await this.photoModel.findOne({
      albumid: createPhotoInput.albumid,
      photourl: createPhotoInput.photourl,
    });
    if (existPhoto)
      throw new BadRequestException('Photo already exist in album');
    const newPhoto = new this.photoModel(createPhotoInput);
    return await newPhoto.save();
  }

  findAll(albumid: string) {
    return this.photoModel.find({ albumid });
  }

  findOne(id: string) {
    return this.photoModel.findById(id);
  }

  async update(id: string, updatePhotoInput: UpdatePhotoInput) {
    const existPhoto = await this.photoModel.findOne({
      albumid: updatePhotoInput.albumid,
      photourl: updatePhotoInput.photourl,
      _id: { $ne: id },
    });
    if (existPhoto)
      throw new BadRequestException('Photo already exist in album');
    return this.photoModel.findByIdAndUpdate(id, updatePhotoInput);
  }

  remove(id: string) {
    return this.photoModel.findByIdAndDelete(id);
  }
}
