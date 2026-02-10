import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
      version: '1.0.0',
    };
  }

  getVersion() {
    return {
      version: '1.0.0',
      apiVersion: 'v1',
      services: {
        gateway: '1.0.0',
        vendor: '1.0.0',
        product: '1.0.0',
        order: '1.0.0',
        compliance: '1.0.0',
        ai: '1.0.0',
        notification: '1.0.0',
      },
    };
  }
}
