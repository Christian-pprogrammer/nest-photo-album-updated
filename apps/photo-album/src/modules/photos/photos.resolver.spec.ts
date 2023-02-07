import { Test, TestingModule } from '@nestjs/testing';
import { PhotosResolver } from './photos.resolver';
import { PhotosService } from './photos.service';

describe('PhotosResolver', () => {
  let resolver: PhotosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotosResolver, PhotosService],
    }).compile();

    resolver = module.get<PhotosResolver>(PhotosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
