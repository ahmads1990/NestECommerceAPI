import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}
  @Get(':id')
  getCartItems(@Param('id') id: string) {
    return this.cartItemsService.findOne(+id);
  }
  @Post()
  addNewItem(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.addItemToCart(createCartItemDto);
  }

  @Patch(':id')
  updateItem(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(+id, updateCartItemDto);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
