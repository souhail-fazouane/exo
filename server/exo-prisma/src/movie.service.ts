import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  Movie,
  Prisma,
} from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async movie(movieWhereUniqueInput: Prisma.MovieWhereUniqueInput): Promise<Movie | null> {
    return this.prisma.movie.findUnique({
      where: movieWhereUniqueInput,
    });
  }

  async movies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MovieWhereUniqueInput;
    where?: Prisma.MovieWhereInput;
  }): Promise<Movie[]> {
    const { skip, take, cursor, where } = params;
    return this.prisma.movie.findMany({  
      skip,
      take,
      cursor,
      where,      
    });
  }

  async createMovie(data: Prisma.MovieCreateInput): Promise<Movie> {
    return this.prisma.movie.create({
      data,
    });
  }

  async updateMovie(params: {
    where: Prisma.MovieWhereUniqueInput;
    data: Prisma.MovieUpdateInput;
  }): Promise<Movie> {
    const { data, where } = params;
    return this.prisma.movie.update({
      data,
      where,
    });
  }

  async deleteMovie(where: Prisma.MovieWhereUniqueInput): Promise<Movie> {
    return this.prisma.movie.delete({
      where,
    });
  }



}