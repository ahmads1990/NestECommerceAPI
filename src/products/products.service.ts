import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { DeleteResult, Model } from 'mongoose';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productModel.find().lean();
  }

  async getById(productID: string): Promise<Product> {
    const product = await this.productModel.findOne({ productID }).lean();

    if (!product) {
      throw new NotFoundException(`Product not found for id: ${productID}`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productID: string = randomUUID();

    const productToCreate: Product = {
      ...createProductDto,
      productID: productID,
    };

    return await this.productModel.create(productToCreate);
  }

  // formatter issue
  async update(
    productID: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productModel.findOneAndUpdate(
      { productID },
      updateProductDto,
      {
        new: true,
      },
    );
  }

  async delete(productID: string): Promise<DeleteResult> {
    return this.productModel.deleteOne({ productID }).lean();
  }
}
