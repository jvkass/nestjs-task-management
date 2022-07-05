import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.userEntityRepository.create({ username, password });

    try {
      await this.userEntityRepository.save(user);
    } catch (error) {
      if(error.code === '23505'){
        throw new ConflictException("Username already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
