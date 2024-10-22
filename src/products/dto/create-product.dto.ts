import { Length, Max, Min } from 'class-validator';

export class CreateProductDto {
  @Length(5, 20)
  name: string;
  @Length(20, 200)
  description: string;
  @Min(0)
  @Max(100)
  price: number;
}
