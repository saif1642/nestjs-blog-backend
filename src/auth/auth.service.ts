import { Injectable, InternalServerErrorException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RegistrationDTO, LoginDTO } from 'src/models/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepo : Repository<UserEntity>,
        private jwtService : JwtService
    ){}

    async register(credentials : RegistrationDTO){
       try{
          const user = this.userRepo.create(credentials);
          await user.save()
          const payload = { username : user.username};
          const token = this.jwtService.sign(payload);
          return { user : {...user.toJSON(),token}};
       }catch(err){
          if(err.code === '23505'){
              throw new ConflictException('Username has already been taken');
          }
          throw new InternalServerErrorException();
       }
    }

    async login(credentials : LoginDTO){
        try{
           const user = await this.userRepo.findOne({ where: {email:credentials.email}});
           const isValid = await user.comparePassword(credentials.password);
           if(!isValid){
                throw new UnauthorizedException('Invalid Credentials');
           }
           const payload = { username : user.username};
           const token = this.jwtService.sign(payload);
           return { user : {...user.toJSON(),token}};
        }catch(err){
            throw new InternalServerErrorException();
        }
    }
}
