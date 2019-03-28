import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
  suppliers: string[];

  constructor() { }

  ngOnInit() {
    this.name = 'Product name';
    this.description = 'Product description';
    this.price = 100;
    this.category = Category.category1;
    this.isAvailable = true;
    this.suppliers = [
      'Supplier 1',
      'Supplier 2',
      'Supplier 3'
    ];
  }

  onBuy() {
    console.log('On buy was pressed.');
  }
}
