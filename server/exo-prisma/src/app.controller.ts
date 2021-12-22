import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { User as UserModel, Movie as MovieModel } from '@prisma/client';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly movieService: MovieService,
  ) {}

  @Get('movie/:id')
  async getMovieById(@Param('id') id: string): Promise<MovieModel> {
    return this.movieService.movie({ id: Number(id) });
  }

  @Get('movies/:email')
  async getMovieLikedByEmail(@Param('email') user: string): Promise<MovieModel[]> {
    return this.movieService.movies({
      where: { whoLiked:{ some: {email:user}} }
    });
  }

  @Get('feed')
  async getMovies(): Promise<MovieModel[]> {
    return this.movieService.movies({});
  }

  @Post('movie')
  async createMovie(
    @Body() movieData: { idMovie: string; original_title: string; overview: string; poster_path: string; backdrop_path: string },
    @Req() request: Request
  ): Promise<MovieModel> {
    const { idMovie, original_title, overview, poster_path, backdrop_path } = movieData;
    
    return this.movieService.createMovie({
      idMovie: parseInt(idMovie),
      original_title: original_title,
      overview:overview,
      poster_path:poster_path,
      backdrop_path:backdrop_path
    });
  }
  @Delete('movie/:id')
  async deleteMovie(@Param('id') idMovie: string, @Req() request: Request): Promise<MovieModel> {
    
    return this.movieService.deleteMovie({idMovie: parseInt(idMovie) });
  }
  /*
  @Post('post')
  async createMovie(
    @Body() movieData: { idMovie: string; whoLiked: string },
  ): Promise<MovieModel> {
    const { idMovie, whoLiked } = movieData;
    return this.movieService.createMovie({
      idMovie: Number(idMovie),
      whoLiked: {connect:{email:whoLiked}},
    });
  }
  */

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('liked/:id/:user')
  async likedMovie(@Param('id') id: string, @Param('user') user: string): Promise<MovieModel> {
    return this.movieService.updateMovie({
      where: { id: Number(id) },
      data: { whoLiked: {connect:{email:user}} },
    });
  }

  @Put('disliked/:id/:user')
  async disLikedMovie(@Param('id') id: string, @Param('user') user: string): Promise<MovieModel> {
    return this.movieService.updateMovie({
      where: { id: Number(id) },
      data: { whoLiked: {disconnect:{email:user}} },
    });
  }


}