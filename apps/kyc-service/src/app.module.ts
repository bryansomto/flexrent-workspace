import { Module } from '@nestjs/common';
import { KycController } from './kyc.controller';
import { MockPremblyAdapter } from './adapters/mock-prembly.adapter';

@Module({
  imports: [],
  controllers: [KycController],
  
  // This is where we register the service so the Controller can find it
  providers: [MockPremblyAdapter],
})
export class AppModule {}