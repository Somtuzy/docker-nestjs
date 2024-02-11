import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    async logMessage(message: string) {
        console.log(message);
    }
}