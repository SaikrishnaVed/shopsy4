import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListNewComponent } from './products-list-new.component';

describe('ProductsListNewComponent', () => {
  let component: ProductsListNewComponent;
  let fixture: ComponentFixture<ProductsListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
