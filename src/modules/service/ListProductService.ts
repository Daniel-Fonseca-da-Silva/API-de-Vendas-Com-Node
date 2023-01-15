import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../products/typeorm/repositories/ProductsRepository';
import Product from '../products/typeorm/entities/Product';

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
