import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PhotosService } from './photos.service';
import { Photo } from './entities/photo.entity';
import { CreatePhotoInput } from './dto/create-photo.input';
import { UpdatePhotoInput } from './dto/update-photo.input';

@Resolver(() => Photo)
export class PhotosResolver {
  constructor(private readonly photosService: PhotosService) {}

  @Mutation(() => Photo)
  createPhoto(@Args('createPhotoInput') createPhotoInput: CreatePhotoInput) {
    return this.photosService.create(createPhotoInput);
  }

  @Query(() => [Photo], { name: 'photos' })
  findAll() {
    return this.photosService.findAll();
  }

  @Query(() => Photo, { name: 'photo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.photosService.findOne(id);
  }

  @Mutation(() => Photo)
  updatePhoto(@Args('updatePhotoInput') updatePhotoInput: UpdatePhotoInput) {
    return this.photosService.update(updatePhotoInput.id, updatePhotoInput);
  }

  @Mutation(() => Photo)
  removePhoto(@Args('id', { type: () => Int }) id: number) {
    return this.photosService.remove(id);
  }
}
