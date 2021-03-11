import { Injectable } from '@angular/core';
import { Student } from './student';
import { STUDENTS } from './mockData';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class StudentService {
   
    public studentDataSubject: BehaviorSubject<[]> = new BehaviorSubject([]);
    public studentData$: Observable<any> =  this.studentDataSubject.asObservable();
    public savedData: any;
    constructor() { }

    set studentResponse(response: []) {
        this.studentDataSubject.next(response);
    }

    public accessUsers(): Student[] {
        return STUDENTS;
    }

    public getGradePercentage(studentData: Student[]): Array<any> {
        const totalStudents = studentData.length;
        const studentGrades = studentData.reduce((val: any, curr: any) => {
            if (val[curr.grade]) {
                val[curr.grade] += 1;
            } else {
                val[curr.grade] = 1;
            }
            return val;
        }, {});
        let gradeTotal: any = {};
        for (let grade in studentGrades) {
            gradeTotal[grade] = ( studentGrades[grade] / totalStudents ) * 100;
        }

        return [Object.keys(gradeTotal), Object.values(gradeTotal)];
    }
}
