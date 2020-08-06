import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserEntity) private userRepo : Repository<UserEntity>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: process.env.SECRET
        });
    }

    async validate(payload){
       const { username } = payload;
       const user = this.userRepo.find({ where:{ username } });

       if(!user){
           throw new UnauthorizedException()
       }

       return user;
    }

}
