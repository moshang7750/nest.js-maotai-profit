import { Injectable, Logger } from '@nestjs/common';
import { ProductService } from './product.service';
@Injectable()
export class AppService {
  constructor(
    private readonly productService: ProductService,
  ) { }
  async main() {
    await this.productService.getProduct();
    return;
  }
  getHello() {
    this.main()
    return "Hello  world";
  }
}
