import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(private userEntityRepository:UserRepository){}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.userEntityRepository.createUser(authCredentialsDto);
    }
}
