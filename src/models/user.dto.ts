import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';


export class LoginDTO{
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    password:string;
}

export class RegistrationDTO extends LoginDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username:string;
}