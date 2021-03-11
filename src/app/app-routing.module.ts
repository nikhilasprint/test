import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StudentSummaryComponent } from './student-summary/student-summary.component';

const routes: Routes = [
  {path: '', component: PieChartComponent},
  {path: 'studentSummary', component: StudentSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
