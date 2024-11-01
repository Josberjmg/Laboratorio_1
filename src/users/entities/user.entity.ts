import { UserGender } from "src/common/enums/gender.enum"
import { UserRoles } from "src/common/enums/roles.enum"

export class UserEntity {
    id: number
    name:string
    age:number
    photo: string[]
    email: string
    password: string
    role: UserRoles
    gender: UserGender
    isActive: boolean
}
