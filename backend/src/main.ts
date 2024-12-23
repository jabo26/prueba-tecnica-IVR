import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  const config= new DocumentBuilder()
                    .setTitle('API')
                    .setDescription('Prueba Técnica Konecta')
                    .addTag('IVR')
                    .setVersion('1.0').build();

                    app.enableCors({
                      origin: ['http://localhost:5173'], 
                      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                      credentials: true,
                    });

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
