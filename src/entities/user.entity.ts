import * as bcrypt from 'bcryptjs';
import { AbstractEntity } from "./abstract.entity";
import { Column, BeforeInsert, Entity } from "typeorm";
import { Exclude, classToPlain } from "class-transformer";
import { IsEmail } from "class-validator";
@Entity('users')
export class UserEntity extends AbstractEntity{
    @Column()
    @IsEmail()
    email:string;
    
    @Column({ unique : true})
    username:string;

    @Column({ default:'' })
    bio:string;

    @Column({ default : null, nullable:true})
    image:string | null;

    @Column()
    @Exclude()
    password:string

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password , 10);
    }

    toJSON(){
        return classToPlain(this);
    }

    async comparePassword(attempt: string){
        return await bcrypt.compare(attempt,this.password);

    }
}