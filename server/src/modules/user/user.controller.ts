import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.strategy';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/config';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findUser(@Request() req) {
    const userID = req.user.id;
    return this.usersService.findUser(userID);
  }
  @Post('create')
   @UseInterceptors(FileInterceptor('avatar',{storage: storageConfig('avatar')}))
  async create(@Req() req:any,@Body() createUserDto: CreateUserDto,@UploadedFile() file:Express.Multer.File) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('avatar',{storage: storageConfig('avatar')}))
  uploadFile(@UploadedFile() file:Express.Multer.File,@Param('id') id:number){
    return this.usersService.uploadFile(id,file.filename);
  }
}