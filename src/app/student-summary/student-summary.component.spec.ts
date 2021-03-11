import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StudentSummaryComponent } from './student-summary.component';

describe('StudentSummaryComponent', () => {
  let component: StudentSummaryComponent;
  let fixture: ComponentFixture<StudentSummaryComponent>;

  const student = {
    id: '1',
    name: 'Micheal Pete',
    grade: 'Grade A',
    age: 11,
    email: 'test1@gmail.com',
    maths: 90,
    english: 60,
    science: 70,
    social: 80,
    isEmailEditable: false
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [ReactiveFormsModule, FormsModule],
      imports: [RouterModule],
      declarations: [ StudentSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on double clicking age should show edit field', () => {
    spyOn(component, 'hideShowAge');
    component.editAge(student);
    expect(component.hideShowAge).toHaveBeenCalled();

  });

  it('on double clicking email should show edit field', () => {
    component.editEmail(student);
    expect(student.isEmailEditable).toBeTruthy();
    
  });

  it('hideShowAge method should toggle the editable field', () => {
    component.isAgeEditable = false;
    component.hideShowAge(student);
    expect(component.isAgeEditable).toBeFalsy();

    component.isAgeEditable = true;
    component.hideShowAge(student);
    expect(component.isAgeEditable).toBeTruthy();
  });

  it('hideShowEmail method should validate the sudent email', () => {
    const student: any = {
      id: '1',
      name: 'Micheal Pete',
      grade: 'Grade A',
      age: 11,
      email: 'test1@gmail.com',
      maths: 90,
      english: 60,
      science: 70,
      social: 80
    };

    component.hideShowEmail(student);
    expect(student.emailError).toBeFalsy();

    student.email = 'test1';
    component.hideShowEmail(student);
    expect(student.emailError).toBeTruthy();
  });
});
