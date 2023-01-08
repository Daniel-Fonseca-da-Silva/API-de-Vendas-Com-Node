import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductsRepository';
import Product from './Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });
    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
