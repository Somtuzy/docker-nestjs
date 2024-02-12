import { Controller, Get, HttpStatus, Query, Redirect, Res } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get('health')
  checkHealth() {
    return 'OK'
  }

  @Get()
  welcome() {
    return {
      message: 'Welcome to my NestJs Docker Application'
    }
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', HttpStatus.PERMANENT_REDIRECT)
  getDocs(@Query('version') version: string){
    if (version && version === '5') {
      return { url: 'https://twitter.com/@somtuzyonyeka' };
    }
  }
}