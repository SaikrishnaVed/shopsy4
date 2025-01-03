import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListProductsComponent } from './wish-list-products.component';

describe('WishListProductsComponent', () => {
  let component: WishListProductsComponent;
  let fixture: ComponentFixture<WishListProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
