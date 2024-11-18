import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModelsModule } from './common/config/mongoose.config';
import { GlobalConfigModule } from './common/config/config.config';
import { DatabaseModule } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';
import { CredentialService } from './credential/credential.service';
import { CredentialModule } from './credential/credential.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [GlobalConfigModule, DatabaseModule, MongooseModelsModule, AuthModule, CredentialModule, UserModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, CredentialService]
})
export class AppModule {}
