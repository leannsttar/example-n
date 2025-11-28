import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './app.service';
import type { User } from './app.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): User {
    return this.usersService.findById(Number(id))
  }

  @Get('search')
  getByName(@Query('name') name?: string): User[] {
    return this.usersService.findByName(name)
  }

  @Post()
  create(@Body() body: Partial<User>): User {
    return this.usersService.create(body)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<User>): User {
    return this.usersService.update(Number(id), body)
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return this.usersService.delete(Number(id))
  }

}
