

export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly password: string, // hash recomendado
    public readonly role: UserRole,
  ) {}

  static getUserRole(role: string): UserRole {
    switch ((role ?? '').toUpperCase()) {
      case UserRole.ADMIN:
        return UserRole.ADMIN;
      case UserRole.EMPLEADO:
      default:
        return UserRole.EMPLEADO;
    }
  }
}




export enum UserRole {
    ADMIN = 'ADMIN',
    EMPLEADO = 'EMPLEADO',
}