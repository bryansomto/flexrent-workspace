import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class MockPremblyAdapter {
  
  // This mimics the method signature of the real API adapter
  async verifyBVN(bvn: string) {
    console.log(`[MOCK API] Verifying BVN: ${bvn}`);

    // Scenario 1: The "Happy Path" (User enters this to pass)
    // Use this BVN when testing your Frontend
    if (bvn === '12345678901') {
      return {
        success: true,
        data: {
          firstName: 'BRYAN',
          lastName: 'SOMTO', // Ensure your local user matches this name
          dateOfBirth: '1997-05-12',
          gender: 'Male',
          photo: 'https://via.placeholder.com/150',
          verificationStatus: 'VERIFIED'
        }
      };
    }

    // Scenario 2: The "Mismatch" (User enters this to fail name check)
    if (bvn === '99999999999') {
      return {
        success: true,
        data: {
          firstName: 'UNKNOWN',
          lastName: 'PERSON', // This won't match "Bryan", triggering rejection
          verificationStatus: 'VERIFIED'
        }
      };
    }

    // Scenario 3: Invalid/Not Found (Simulating a 404 from Prembly)
    throw new HttpException({
      status: false,
      message: 'BVN not found'
    }, HttpStatus.BAD_REQUEST);
  }
}