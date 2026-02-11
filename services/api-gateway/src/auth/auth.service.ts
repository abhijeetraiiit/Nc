import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string) {
    // TODO: Implement actual user authentication with database
    // This is a stub implementation
    if (email && password) {
      const payload = { email, sub: 'user-id-placeholder' };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: 'user-id-placeholder',
          email,
          name: 'User Name',
        },
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async register(email: string, password: string, name: string) {
    // TODO: Implement actual user registration with database
    // This is a stub implementation
    const payload = { email, sub: 'new-user-id' };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: 'new-user-id',
        email,
        name,
      },
    };
  }
}
