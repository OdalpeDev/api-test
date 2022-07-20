import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IregisterUser } from 'src/core/cases/register-user.uc';
import { ResponseHttp } from 'src/core/domain/commons/response-http.model';
import { CreateUserDto } from '../dtos/user-register.dto';

@ApiTags('Users')
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly ucRegiterUser: IregisterUser) {}

  @ApiOperation({
    description: 'Regitra un nuevo usuario en el sistema.',
  })
  @ApiResponse({ type: ResponseHttp })
  @Post('/register')
  async registerUser(@Body() userData: CreateUserDto): Promise<ResponseHttp> {
    return this.ucRegiterUser.register(userData);
  }
}
