import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SprkHelperTextDirective } from './sprk-helper-text.directive';

@Component({
  selector: 'sprk-test',
  template: `
  <span
    additionalClasses="sprk-u-man"
    sprkHelperText>Helper Text</span>
  <span
    sprkHelperText>Helper Text</span>`
})
class TestComponent {}

describe('Spark Helper Text Directive', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let spanElement1: HTMLElement;
  let spanElement2: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprkHelperTextDirective, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spanElement1 = fixture.nativeElement.querySelectorAll('span')[0];
    spanElement2 = fixture.nativeElement.querySelectorAll('span')[1];
  }));

  it('should create itself', () => {
    expect(component).toBeTruthy();
  });

  it('should add classes if additionalClasses has a value', () => {
    fixture.detectChanges();
    expect(spanElement1.classList.toString()).toEqual(
      'sprk-b-HelperText sprk-u-man'
    );
    expect(spanElement2.classList.toString()).toEqual('sprk-b-HelperText');
  });
});
