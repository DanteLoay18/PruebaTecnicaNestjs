
export class Producto {
    constructor(
      public readonly id: string,
      public nombre: string,
      public descripcion: string,
      public precio: number,
      public cantidad: number,
      public categoriaId: string, // Relación con categoría
    ) {}
  
    static validateCantidad(cantidad: number): boolean {
      return cantidad >= 0;
    }
  }
  