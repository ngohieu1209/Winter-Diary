import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1 style="text-align: center; margin:50px 0 80px 0; font-size: 60px">π’ Welcome to Winter Diary ππ! π</h1>
      <h1 style="text-align: center; font-size: 50px">π»</h1>
      <h3 style="text-align: center; font-size: 40px">π§ NgΓ΄ Trung HiαΊΏu  - Winter Wind π§</h3>
    `;
  }
}
