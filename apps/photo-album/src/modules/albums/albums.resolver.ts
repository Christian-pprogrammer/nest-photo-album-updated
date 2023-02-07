import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { CurrentUser } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(private readonly albumsService: AlbumsService) {}

  @Mutation(() => Album)
  createAlbum(
    @Args('createAlbumInput') createAlbumInput: CreateAlbumInput,
    @CurrentUser() user: Partial<User>
  ) {
    return this.albumsService.create({ ...createAlbumInput, user: user._id });
  }

  @Query(() => [Album], { name: 'albums' })
  async findAll(@CurrentUser() user: Partial<User>) {
    const albums = await this.albumsService.findAll(user._id.toString());
    return albums;
  }

  @Query(() => Album, { name: 'album' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.albumsService.findOne(id);
  }

  @Mutation(() => Album)
  updateAlbum(
    @Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput,
    @CurrentUser() user: Partial<User>
  ) {
    updateAlbumInput.user = user._id;
    return this.albumsService.update(updateAlbumInput.id, updateAlbumInput);
  }

  @Mutation(() => Album)
  removeAlbum(@Args('id', { type: () => String }) id: string) {
    return this.albumsService.remove(id);
  }
}
