import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPinsComponent } from './post-pins.component';

describe('PostPinsComponent', () => {
  let component: PostPinsComponent;
  let fixture: ComponentFixture<PostPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
