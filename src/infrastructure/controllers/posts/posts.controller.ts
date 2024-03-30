import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ApiHeaders } from '@infrastructure/common/decorators/api.decorator';
import { CurrentUserAccount } from '@infrastructure/common/decorators/current-user.decorator';
import { PostPresenter } from './posts.presenter';
import { UpdatePostDto, CreatePostDto } from './posts-dto.class';
import { CreatePostUseCases } from '@usecases/posts/createPost.usecases';
import { DeletePostUseCases } from '@usecases/posts/deletePost.usecases';
import { GetPostsUseCases } from '@usecases/posts/getPosts.usecases';
import { GetPostUseCases } from '@usecases/posts/getPost.usecases';
import { UpdatePostUseCases } from '@usecases/posts/updatePost.usecases';
import { ExceptionsService } from '@infrastructure/exceptions/exceptions.service';
import { BasicAuthGuard } from '@infrastructure/common/guards/basic-auth.guard';
import { UserM } from '@domain/model/user';

@Controller('posts')
@ApiTags('Posts')
@UseInterceptors(ClassSerializerInterceptor)
@ApiHeaders()
@ApiBearerAuth()
export class PostController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_POST_USECASES_PROXY)
    private readonly createProxy: UseCaseProxy<CreatePostUseCases>,
    @Inject(UsecasesProxyModule.GET_POSTS_USECASES_PROXY)
    private readonly getPostsProxy: UseCaseProxy<GetPostsUseCases>,
    @Inject(UsecasesProxyModule.GET_POST_USECASES_PROXY)
    private readonly getPostProxy: UseCaseProxy<GetPostUseCases>,
    @Inject(UsecasesProxyModule.UPDATE_POST_USECASES_PROXY)
    private readonly updatePostProxy: UseCaseProxy<UpdatePostUseCases>,
    @Inject(UsecasesProxyModule.DELETE_POST_USECASES_PROXY)
    private readonly deleteProxy: UseCaseProxy<DeletePostUseCases>,
    private readonly exceptionService: ExceptionsService,
  ) {}

  @Get('all')
  @ApiOperation({
    summary: 'Get all posts',
    description: 'Use this route to get posts',
  })
  @ApiOkResponse({
    description: 'Posts were retrieved successfully',
    type: [PostPresenter],
  })
  @HttpCode(200)
  async allPosts() {
    const posts = await this.getPostsProxy.getInstance().getPosts();
    return posts.map((post) => new PostPresenter(post));
  }

  @Post('')
  @ApiOperation({
    summary: 'This is used to create a new post',
    description: 'Use this route for a user to create a blog post',
  })
  @ApiOkResponse({
    description: 'Successful',
    type: PostPresenter,
  })
  @ApiBody({ type: CreatePostDto })
  @UseGuards(BasicAuthGuard)
  async createPost(
    @CurrentUserAccount() payload: UserM,
    @Body() data: CreatePostDto,
  ) {
    const post = await this.createProxy.getInstance().create({
      ...data,
      userId: payload.id,
    });
    return new PostPresenter(post);
  }

  @Get('')
  @ApiOperation({
    summary: "Get all logged-in user's posts",
    description: 'Use this route to get all logged-in user posts',
  })
  @ApiOkResponse({
    description: 'Posts were retrieved successfully',
    type: [PostPresenter],
  })
  @UseGuards(BasicAuthGuard)
  @HttpCode(200)
  async userPosts(@CurrentUserAccount() payload: UserM) {
    const posts = await this.getPostsProxy
      .getInstance()
      .getUserPosts(payload.id);
    return posts.map((post) => new PostPresenter(post));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a post detail',
    description: 'Use this route to get a post detail',
  })
  @ApiOkResponse({
    description: 'post detail retrieved successfully',
    type: PostPresenter,
  })
  @HttpCode(200)
  @UseGuards(BasicAuthGuard)
  async getPost(@CurrentUserAccount() payload: UserM, @Param('id') id: string) {
    const post = await this.getPostProxy.getInstance().getPost(id);
    if (post.userId !== payload.id) {
      this.exceptionService.unauthorizedException({
        message: 'You are not authorized to access this resource',
      });
    }
    return new PostPresenter(post);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'This is used to update a post',
    description: 'Use this route for a user to update a blog post',
  })
  @ApiOkResponse({
    description: 'Successful',
    type: PostPresenter,
  })
  @ApiBody({ type: UpdatePostDto })
  @HttpCode(200)
  @UseGuards(BasicAuthGuard)
  async updatePost(
    @CurrentUserAccount() payload: UserM,
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
  ) {
    const post = await this.updatePostProxy.getInstance().updatePost(id, {
      ...data,
      userId: payload.id,
    });
    return new PostPresenter(post);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'This is used to delete a post',
    description: 'Use this route for a user to update a blog post',
  })
  @ApiNoContentResponse({
    description: 'Successful',
  })
  @ApiBody({ type: UpdatePostDto })
  @HttpCode(200)
  @UseGuards(BasicAuthGuard)
  async deletePost(
    @CurrentUserAccount() payload: UserM,
    @Param('id') id: string,
  ) {
    await this.deleteProxy.getInstance().deletePost(id, payload.id);
    return;
  }
}
