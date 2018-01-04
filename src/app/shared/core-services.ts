// Angular Imports
import { Provider } from '@angular/core';

// Services Imports
import { RoleService } from './entities/role/role.service';
import { UserService } from './entities/user/user.service';

export const CORE_SERVICES: Provider[] = [
  RoleService,
  UserService
];
