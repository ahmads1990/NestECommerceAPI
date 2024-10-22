import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), ProductsModule, UsersModule, CartsModule, CartItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
