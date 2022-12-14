import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ActivateEmailDto } from './dtos/activateEmail.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { SignInUserDto } from './dtos/signInUser.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<{ msg: string }> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/activation')
  activateEmail(
    @Body() activateEmailDto: ActivateEmailDto,
  ): Promise<{ msg: string }> {
    return this.authService.activateEmail(activateEmailDto);
  }

  @Post('/signin')
  async signIn(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
    const { refreshToken } = await this.authService.signIn(signInUserDto);

    // res.cookie('refreshToken', refreshToken, {
    //   secure: false,
    //   sameSite: 'none',
    //   httpOnly: false,
    //   // path: `/nth/api/v1/auth/refreshToken`,
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
    return res.status(200).json({ refreshToken });
  }

  @Post('/refreshToken')
  async getAccessToken(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken)
      return res.status(400).json({ msg: 'Please login now!' });
    const { accessToken } = await this.authService.getAccessToken(refreshToken);
    return res.status(200).json({ accessToken });
  }

  @Post('/forgot')
  async forgotPassword(@Body('email') email: string, @Res() res: Response) {
    const data = await this.authService.forgotPassword(email);
    return res.json(data);
  }

  @UseGuards(AuthGuard())
  @Post('/resetPassword')
  async resetPassword(
    @Body('password') password: string,
    @Res() res: Response,
    @GetUser() user: User,
  ) {
    const { _id: id } = user;
    const data = await this.authService.resetPassword(id, password);
    return res.json(data);
  }

  @Get('/logout')
  logout(@Res() res: Response) {
    res.clearCookie('refreshToken', { path: 'nth/api/v1/auth/refreshToken' });
    return res.json({ msg: 'Logout success!' });
  }
}
