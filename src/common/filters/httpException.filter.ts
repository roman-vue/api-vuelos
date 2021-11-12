import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import path from "path/posix";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{
   
    private readonly logger = new Logger(AllExceptionFilter.name)

    catch(exception: any, host: ArgumentsHost) {
       const ctx= host.switchToHttp();
       const responses = ctx.getResponse();
       const request = ctx.getRequest();

       const status = exception instanceof HttpException ?
       exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

       const msg = exception instanceof HttpException? 
       exception.getResponse() : exception;

       this.logger.error(`Status: ${status}  Error: ${JSON.stringify(msg)}`);

       responses.status(status).json({
           time: new Date().toISOString,
           path: request.url,
           error: msg
       });
    }
}