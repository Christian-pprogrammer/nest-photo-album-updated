import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './entities/album.entity';
import { Model } from 'mongoose';
import { PhotosService } from '../photos/photos.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    private photosService: PhotosService
  ) {}

  async create(createAlbumInput: CreateAlbumInput) {
    const existAlbum = await this.albumModel.findOne({
      name: createAlbumInput.name,
      user: createAlbumInput.user,
    });
    if (existAlbum) throw new BadRequestException('Album already exists!');
    const createdAlbum = new this.albumModel(createAlbumInput);
    return await createdAlbum.save();
  }

  findAll(id: string) {
    return this.albumModel.find({ user: id });
  }

  async findOne(id: string) {
    const album = await this.albumModel.findById(id);
    const photos = await this.photosService.findAll(id);
    album.photos = photos;
    return album;
  }

  async update(id: string, updateAlbumInput: UpdateAlbumInput) {
    // check if name already exists
    const existAlbum = await this.albumModel.findOne({
      name: updateAlbumInput.name,
      _id: { $ne: id },
      user: updateAlbumInput.user,
    });
    if (existAlbum) throw new BadRequestException('Album already exists!');
    return this.albumModel.findByIdAndUpdate(id, updateAlbumInput, {
      new: true,
    });
  }

  remove(id: string) {
    return this.albumModel.findByIdAndDelete(id);
  }
}
