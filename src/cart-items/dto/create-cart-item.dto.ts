import { IsInt, Max, Min } from 'class-validator';

export class CreateCartItemDto {
  productID: string;
  customerID: string;

  @IsInt()
  @Min(0)
  @Max(10)
  quantity: number;
}
