import { Reflector } from '@nestjs/core';
import { ERole } from '../enum';

export const Roles = Reflector.createDecorator<(string | ERole)[]>();
