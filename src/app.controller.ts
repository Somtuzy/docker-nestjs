import { Controller, Get, HttpStatus, Query, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get()
  checkHealth() {
    return 'OK'
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', HttpStatus.PERMANENT_REDIRECT)
  getDocs(@Query('version') version: string){
    if (version && version === '5') {
      return { url: 'https://twitter.com/@somtuzyonyeka' };
    }
  }
}