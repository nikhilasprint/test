import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
    selector: 'app-student-summary',
    templateUrl: './student-summary.component.html',
    styleUrls: ['./student-summary.component.scss']
})
export class StudentSummaryComponent implements OnInit {
    listOfStudents: any
    isAgeEditable = true;
    isEmailEditable = true;
    editableIndex = null;

    constructor(private studentService: StudentService) { }

    ngOnInit(): void {
        this.studentService.studentData$.subscribe(data => {
            this.listOfStudents = data;
        })

    }

    editAge(student: any) {
        this.hideShowAge(student);
        setTimeout(() => {
            let age = document.getElementById(student.id);
            age?.focus();
        }, 0);
    }

    editEmail(student: any) {
        student.isEmailEditable = !student.isEmailEditable;
        setTimeout(() => {
            let email = document.getElementById(student.id);
            email?.focus();
        }, 0);
    }

    hideShowAge(student: any) {
        student.isAgeEditable = !student.isAgeEditable;
    }

    hideShowEmail(entity: any): void {
        const regex = /\S+@\S+\.\S+/;
        if (regex.test(entity.email)) {
            entity.emailError = false;
            entity.isEmailEditable = !entity.isEmailEditable;
            return;
        }
        entity.emailError = true;
    }

}
