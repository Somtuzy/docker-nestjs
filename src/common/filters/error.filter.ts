import {
  Logger,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  NotFoundException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly configService = new ConfigService();

  catch(exception: unknown, host: ArgumentsHost) {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // Request details
    const { method, path: url } = request;
    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;
    const correlationKey = uuidv4();
    const userId = request.user?._id
      ? `auth-user-id: ${request.user._id}`
      : "'Guest: unauthenticated user'";

    const envName =
      this.configService.get('NODE_ENV') ||
      this.configService.get('app.envName');

    const requestMetaData = `[${correlationKey}] ${method} ${url} ${userId} ${userAgent} ${ip} env: ${envName}`;
    console.log('request details:', requestMetaData);
    
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse() as {
        message: string[] | string;
      };
      let errorMessage: string;
      
      if (exception instanceof ForbiddenException) 
        errorMessage = 'Forbidden Resource: You are not allowed to take this action or access this resource.';
      else if (exception instanceof UnauthorizedException)
        errorMessage =  'Unauthorized Access: You need to be logged in to take this action.';
      else if (exception instanceof NotFoundException)
        errorMessage = 'Resource Not Found: This route does not exist';
      else if (typeof errorResponse.message === 'string')
        errorMessage = errorResponse.message;
      else 
        errorMessage = errorResponse.message[0];
      
      return response.status(status).json({
        success: false,
        error: errorMessage,
        errors: Array.isArray(errorResponse.message)
          ? errorResponse.message
          : undefined
      });
    }

    // when something is wrong with the database connection attempt
    if (exception instanceof mongoose.Error.ValidationError) {
      const errorMessages: string[] = Object.values(exception.errors).map(
        (e) => e.message
      );
      return response.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        error: errorMessages[0],
        errors: errorMessages
      });
    }

    // when something is wrong with the server
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Something went wrong. Please try again later.'
    });
  }
}