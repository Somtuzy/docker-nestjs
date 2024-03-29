import { INestApplication, ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Test } from "@nestjs/testing"
import { AppModule } from "src/app.module"

describe('App e2e', () => {
  let app: INestApplication
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleRef.createNestApplication()
    const configService = app.get(ConfigService);

    app.setGlobalPrefix(configService.get('app.apiPrefix'), {
      exclude: ['/']
    });
    app.useGlobalPipes(
      new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      // transform: true
    }))
    await app.init()
  })
  afterAll(() => {
    app.close()
  })
  
  it.todo('should pass')
})