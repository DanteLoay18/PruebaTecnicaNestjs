

export class User{

    constructor(
        public readonly id:string,
        public username:string,
        public password:string,
        public role:UserRole

    ){}
}


export enum UserRole {
    ADMIN = 'ADMIN',
    EMPLEADO = 'EMPLEADO',
  }