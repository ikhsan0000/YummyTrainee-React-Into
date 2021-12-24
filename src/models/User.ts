import { StringMappingType } from "typescript";

export class User
{
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public email: string ='',
        public role: string =''
    )
    {}

}