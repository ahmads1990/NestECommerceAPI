import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Customer } from 'src/users/schemas/customer.schema';
import { Model } from 'mongoose';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async addItemToCart(createCartItemDto: CreateCartItemDto) {
    const { customerID, productID } = createCartItemDto;
    let customer = await this.customerModel.findOne({ customerID }).exec();
    if (!customer) {
      throw new NotFoundException(`Customer not found for id: ${customerID}`);
    }
    let product = await this.productModel.findOne({ productID }).exec();
    if (!product) {
      throw new NotFoundException(`Product not found for id: ${productID}`);
    }

    const cartItem = {
      productId: productID,
      productName: product.name,
      price: product.price,
      quantity: createCartItemDto.quantity,
    };

    customer.cart.push(cartItem);
    return await customer.save();
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
