import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CredentialModule } from 'src/credential/credential.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashHelperService } from 'src/common/helpers';
import { JwtStrategy, LocalStrategy } from 'src/common/strategies';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from 'src/common/strategies/google.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
    PassportModule.register({}),
    UserModule,
    CredentialModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy, HashHelperService]
})
export class AuthModule {}
