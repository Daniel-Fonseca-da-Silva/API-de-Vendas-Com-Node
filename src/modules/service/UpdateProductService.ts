import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../products/typeorm/repositories/ProductsRepository';
import Product from '../products/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    const productExists = await productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Product not found.');
    }

    if (productExists && name != product.name) {
      throw new AppError('There is already product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
