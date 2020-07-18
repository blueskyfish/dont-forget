import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { API_SECURITY } from '../auth';
import { AuthUser, GetAuthUser } from '../auth/user';
import { ChangePasswordPayload, UserInfo } from '../business/user/entities';
import { UserService } from '../business/user';
import { ErrorBody } from '../common/error';

/**
 * The user controller manages the current user.
 */
@ApiTags('User')
@Controller('/user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @ApiOperation({
    description: 'Get the information of the current user',
    operationId: 'getInfo',
    security: API_SECURITY,
  })
  @ApiOkResponse({
    description: 'The current user information',
    type: UserInfo,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorization access',
    type: ErrorBody,
  })
  @Get('/info')
  async getInfo(@GetAuthUser() authUser: AuthUser): Promise<UserInfo> {
    return await this.userService.getInfo(authUser);
  }

  @ApiOperation({
    description: 'Chnage the password of the current user',
    operationId: 'changePassword',
    security: API_SECURITY
  })
  @ApiOkResponse({
    description: 'The current user information',
    type: UserInfo,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorization access',
    type: ErrorBody,
  })
  @ApiBadRequestResponse({
    description: 'Required parameters are missing',
    type: ErrorBody,
  })
  @Put('/password')
  async changePassword(@GetAuthUser() authUser: AuthUser, @Body() payload: ChangePasswordPayload): Promise<UserInfo> {
    return await this.userService.changePassword(authUser, payload);
  }
}
