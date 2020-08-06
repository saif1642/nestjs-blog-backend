import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegistrationDTO, LoginDTO } from 'src/models/user.dto';

@Injectable()
export class AuthService {
    private dummyUser = {
        "email": "jake@jake.jake",
        "token": "jwt.token.here",
        "username": "jake",
        "bio": "I work at statefarm",
        "image": null
    }

    register(credentials : RegistrationDTO){
        return credentials;
    }

    login(credentials : LoginDTO){
        if(credentials.email === 'jake@jake.jake'){
            return this.dummyUser;
        }

        throw new InternalServerErrorException();
    }
}
