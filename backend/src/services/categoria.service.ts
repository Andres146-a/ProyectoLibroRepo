import { CategoriaRepository } from '../repositories/categoria.repository';

export class CategoriaService {
  private categoriaRepo = new CategoriaRepository();

  async obtenerCategorias(): Promise<any[]> {
    return await this.categoriaRepo.getAll();
  }
}
