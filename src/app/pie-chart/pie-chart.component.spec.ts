import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PieChartComponent } from './pie-chart.component';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [ PieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigateToLogin should redirect to student summary page', () => {
    spyOn(component.router, 'navigateByUrl');
    component.navigateToLogin({});
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/studentSummary');
  });

  it('chartClicked method should call navigate', () => {
    const val = {
      active: [{
        _chart: {
          getElementAtEvent: () => [{_index: 1}],
          data: {labels: ['t1', 't2'], datasets: [{data: [{}, {}]}]},
          
        }
      }],
      event: {}
    };
    spyOn(component, 'navigateToLogin');
    component.chartClicked(val);
    expect(component.navigateToLogin).toHaveBeenCalled();
  });
});
