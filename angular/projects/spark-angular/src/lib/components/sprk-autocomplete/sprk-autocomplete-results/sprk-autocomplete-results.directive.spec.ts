import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SprkAutocompleteResultsDirective } from './sprk-autocomplete-results.directive';

@Component({
  selector: 'sprk-test',
  template: `
    <ul
      sprkAutocompleteResults
      analyticsString="results1"
      idString="resultsId1"
      additionalClasses="testClass"
    ></ul>
  `,
})
class TestComponent {}

describe('Spark Autocomplete Results Directive', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprkAutocompleteResultsDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('ul');

    fixture.detectChanges();
  }));

  it('should create itself', () => {
    expect(component).toBeTruthy();
  });

  it('should add the correct base class', () => {
    expect(element.classList.contains('sprk-c-Autocomplete__results')).toEqual(
      true,
    );
  });

  it('should add the correct role', () => {
    expect(element.getAttribute('role')).toEqual('listbox');
  });

  it('should add classes if additionalClasses has a value', () => {
    expect(element.classList.contains('testClass')).toEqual(true);
  });

  it('should add a value for data-analytics if analyticsString has a value', () => {
    expect(element.getAttribute('data-analytics')).toEqual('results1');
  });

  it('should add a value for data-id if idString has a value', () => {
    expect(element.getAttribute('data-id')).toEqual('resultsId1');
  });
});
