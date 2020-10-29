import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

const { PORT } = process.env

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder().setTitle('Liteflix bff').build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT || 3000)
}
bootstrap()
