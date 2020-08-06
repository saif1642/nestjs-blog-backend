import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';


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

export class UpdateUserDTO {
    @IsEmail()
    @IsOptional()
    email: string;
  
    @IsOptional()
    image: string;
  
    @IsOptional()
    bio: string;
  }

export interface AuthPayload{
    username:string;
} 