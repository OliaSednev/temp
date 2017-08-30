import { Component } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {DashboardData} from '../../models/app.models';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    dashboardData : DashboardData;

    // public lineChartLabels: Array<any> = ['', '', '', '', '', '', ''];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // red
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,0,0,1)',
            pointBackgroundColor:'rgba(255,0,0,1)',
            pointBorderColor: 'rgba(255,0,0,1)',
            pointHoverBackgroundColor: 'rgba(255,0,0,1)',
            pointHoverBorderColor: 'rgba(255,0,0,1)'
        },
        { // green
            backgroundColor: 'transparent',
            borderColor: 'rgba(0,255,0,1)',
            pointBackgroundColor:'rgba(0,255,0,1)',
            pointBorderColor: 'rgba(0,255,0,1)',
            pointHoverBackgroundColor: 'rgba(0,255,0,1)',
            pointHoverBorderColor: 'rgba(0,255,0,1)',
        },
        { // blue
            backgroundColor: 'transparent',
            borderColor: 'rgba(0,0,255,1)',
            pointBackgroundColor: 'rgba(0,0,255,1)',
            pointBorderColor:  'rgba(0,0,255,1)',
            pointHoverBackgroundColor:  'rgba(0,0,255,1)',
            pointHoverBorderColor:  'rgba(0,0,255,1)'
        },
        { // orange
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 165, 0,1)',
            pointBackgroundColor: 'rgba(255, 165, 0,1)',
            pointBorderColor:  'rgba(255, 165, 0,1)',
            pointHoverBackgroundColor:  'rgba(255, 165, 0,1)',
            pointHoverBorderColor:  'rgba(255, 165, 0,1)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    public pieChartType:string = 'pie';

    constructor(private dashboardService : DashboardService) {
    }

    ngOnInit(): void {
        this.dashboardService.getDashboardData().subscribe((arrivedData: DashboardData) => {
            this.dashboardData = arrivedData;

            this.drawPieCharts();
        });
    }

    drawPieCharts() {

        google.charts.load('current', {'packages': ['corechart']});

        google.charts.setOnLoadCallback(()=>this.drawPieChart1());

        google.charts.setOnLoadCallback(()=>this.drawPieChart2());
    }

    drawPieChart2() {
        let arrX = new Array(this.dashboardData.pieChartData2.pieChartData.length);

        for (var i = 0; i < this.dashboardData.pieChartData2.pieChartData.length; i++) {
            arrX[i] = new Array(2);
            arrX[i][0] = this.dashboardData.pieChartData2.pieChartLabels[i];
            arrX[i][1] = this.dashboardData.pieChartData2.pieChartData[i];
        }

        arrX.unshift(['lable', 'data']);

        var data = google.visualization.arrayToDataTable(arrX);

        var options = {
            title: 'Forecasts'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart2'));

        chart.draw(data, options);

    }

    drawPieChart1() {

        let arrX = new Array(this.dashboardData.pieChartData1.pieChartData.length);

        for (var i = 0; i < this.dashboardData.pieChartData1.pieChartData.length; i++) {
            arrX[i] = new Array(2);
            arrX[i][0] = this.dashboardData.pieChartData1.pieChartLabels[i];
            arrX[i][1] = this.dashboardData.pieChartData1.pieChartData[i];
        }

        arrX.unshift(['lable', 'data']);

        var data = google.visualization.arrayToDataTable(arrX);

        var options = {
            title: 'Trends'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart1'));

        chart.draw(data, options);
    }
}
