import { IsNotEmpty, IsString, IsNumber, MinLength, Min, IsBoolean, IsEnum } from 'class-validator';
import { UserGender } from 'src/common/enums/gender.enum';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsNumber()
    @Min(16, {message:'no cumple la edad permitida'})
    age:number

    @IsNotEmpty()
    photo: string[]
    
    @IsNotEmpty()
    @IsString()
    @MinLength(11)
    email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    password: string

    @IsNotEmpty()
    @IsEnum(UserGender)
    gender:UserGender

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean
}
