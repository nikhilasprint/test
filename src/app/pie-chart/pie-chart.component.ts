import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { STUDENTS } from '../mockData';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[]; // = ['Grade A', 'Grade B', 'Grade C'];
  public pieChartData: SingleDataSet; // = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public checkIfClicked: boolean = false;
  public openform: FormGroup;
  public getMockData: any;
  public listOfStudents: any;
  Grade: Array<string> = ['Grade A', 'Grade B', 'Grade C']
  student: any;

  constructor(
    public studentService: StudentService,
    public router: Router
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

    const studentGrades = this.studentService.getGradePercentage(STUDENTS);
    this.pieChartLabels = studentGrades[0];
    this.pieChartData = studentGrades[1];
    this.openform = new FormGroup({
      name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[a-z]{1,8}")
      ])),
      id: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[a-z]{1,8}")
      ])),
      grade: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[a-z]{1,8}")
      ])),
      maths: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[a-z]{1,8}")
      ])),
      english: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[a-z]{1,8}")
      ])),
      social: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[a-z]{1,8}")
      ]))
    });
  }

  ngOnInit() {
    this.student = this.studentService.accessUsers();
  }

  public chartClicked(e: any): void {
    this.checkIfClicked = true;
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if (activePoints.length > 0) {
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        const value = chart.data.datasets[0].data[clickedElementIndex];
        this.getMockData = this.studentService.accessUsers();
        this.listOfStudents = this.getMockData.filter((data: { grade: any; }) => data.grade === label);
        this.student = this.listOfStudents;
        this.navigateToLogin(this.student);

      }
    }
  }

  navigateToLogin(data: any) {
    this.studentService.studentResponse = data;
    this.router.navigateByUrl('/studentSummary');
  }
}