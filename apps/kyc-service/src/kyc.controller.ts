import { Controller, Post, Body } from '@nestjs/common';
import { MockPremblyAdapter } from './adapters/mock-prembly.adapter';

@Controller('kyc')
export class KycController {
  // Inject the Mock Adapter here
  constructor(private readonly kycProvider: MockPremblyAdapter) {}

  @Post('verify-bvn')
  async verifyUser(@Body() body: { bvn: string }) {
    // This calls the mock function we wrote above
    const result = await this.kycProvider.verifyBVN(body.bvn);
    
    return {
      message: 'KYC Check Complete',
      details: result.data
    };
  }
}