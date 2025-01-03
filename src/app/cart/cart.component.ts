import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any;
  totalAmount: number = 0;
  isLoading = false;
  PurchaseOrder = {
    Id: 0,
    Product_Id: 0,
    Quantity: 0,
    userId: 0,
    price: 0,
    DateCreated: new Date()
  };

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

// Load cart items from the backend
loadCartItems(): void {
  //this.isLoading = true;
  this.appService.GetCartItems().subscribe({
    next: (response: any) => {
      //this.isLoading = false;
      console.log(response);
      this.cartItems = response.map((cartItem: any) => ({
        cart_Id: cartItem.cart_Id,
        userId: cartItem.userId,
        product_id: cartItem.product_Id,
        product_name: cartItem.products[0]?.product_Name,
        list_price: cartItem.products[0]?.list_Price,
        color: cartItem.products[0]?.color,
        imagePath: cartItem.products[0]?.imagePath,
        count: cartItem.quantity,
      }));
      this.calculateTotalAmount();
    },
    error: (err) => {
      //this.isLoading = false;
      console.error('Error fetching cart items:', err);
    },
  });
}

// Calculate the total amount
calculateTotalAmount(): void {
  this.totalAmount = this.cartItems.reduce(
    (acc, item) => acc + item.list_price * item.count,
    0
  );
}

// Increment item quantity
incrementItem(item: CartItem): void {
  //this.isLoading = true;
  const updatedItem = {
    Cart_Id: item.cart_Id,
    Quantity: item.count + 1,
    product_Id: item.product_id,
    userId: Number(localStorage.getItem('userId'))
  };

  this.appService.UpdateCartItem(item.cart_Id, updatedItem).subscribe({
    next: () => {
      //this.isLoading = false;
      item.count += 1;
      this.calculateTotalAmount();
      console.log('Cart item incremented successfully.');
    },
    error: (err) => {
      //this.isLoading = false;
      console.error('Error incrementing cart item:', err);
    },
  });
}

// Decrement item quantity
decrementItem(item: CartItem): void {
  //this.isLoading = true;
  if (item.count > 1) {
    const updatedItem = {
      Cart_Id: item.cart_Id,
      Quantity: item.count - 1,
      product_Id: item.product_id,
      userId: Number(localStorage.getItem('userId'))
    };

    this.appService.UpdateCartItem(item.cart_Id, updatedItem).subscribe({
      next: () => {
        //this.isLoading = false;
        item.count -= 1;
        this.calculateTotalAmount();
        console.log('Cart item decremented successfully.');
      },
      error: (err) => {
        //this.isLoading = false;
        console.error('Error decrementing cart item:', err);
      },
    });
  } else {
    this.removeItem(item);
  }
}

// Remove an item from the cart
removeItem(item: CartItem): void {
  //this.isLoading = true;
  this.appService.DeleteCartItem(item.cart_Id).subscribe({
    next: () => {
      //this.isLoading = true;
      this.cartItems = this.cartItems.filter((cartItem) => cartItem.cart_Id !== item.cart_Id);
      this.calculateTotalAmount();
      console.log('Cart item removed successfully.');
    },
    error: (err) => {
      //this.isLoading = false;
      console.error('Error removing cart item:', err);
    },
  });
}

  checkout(): void {
    // //this.isLoading = true;
  const userId = Number(localStorage.getItem('userId'));

  if (!userId || !this.cartItems || this.cartItems.length === 0) {
    alert('No items in the cart to checkout.');
    return;
  }

  // // Create purchase order objects for each cart item
  // const addPurchaseOrderRequest = {
  //   userId: userId,
  //   DateCreated: new Date(),
  // };


  // // Create an array of purchase orders from cart items
  // const purchaseOrders = this.cartItems.map((item: CartItem) => ({
  //   Product_Id: item.product_id,
  //   Quantity: item.count,
  //   userId: userId,
  //   price: item.list_price,
  //   DateCreated: new Date(),
  // }));

  // Map cart items to purchase orders
  const purchaseOrders: PurchaseOrder[] = this.cartItems.map((item: CartItem) => ({
    Id: 0, // Set 0 for new entries, as ID will be auto-generated in the backend
    Product_Id: item.product_id,
    Quantity: item.count,
    userId: userId,
    price: item.list_price,
    DateCreated: new Date(), // Set the current date
  }));

  // Send all purchase orders in a single bulk insert request
  this.appService.AddBulkPurchaseOrders(purchaseOrders).subscribe({
    next: () => {
      //this.isLoading = false;
      alert('Checkout completed successfully!');
      // Optionally reload cart items or navigate to a success page
      this.loadCartItems(); 
    },
    error: (err) => {
      //this.isLoading = false;
      console.error('Error during checkout:', err);
      alert('Failed to complete checkout. Please try again.');
    },
  });
  }
}

export class CartItem {
cart_Id: number;
userId: number;
product_id: number;
product_name: string;
list_price: number;
color: string;
imagePath: string;
count: number;
}

export class PurchaseOrder {
  Id: number;
  Product_Id: number;
  Quantity: number;
  userId: number;
  price: number;
  DateCreated: Date;
}