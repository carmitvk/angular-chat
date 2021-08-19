import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingContainerComponent } from './typing-container.component';

describe('TypingContainerComponent', () => {
  let component: TypingContainerComponent;
  let fixture: ComponentFixture<TypingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypingContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
