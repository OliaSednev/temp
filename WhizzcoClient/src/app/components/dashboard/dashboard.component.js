"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const dashboard_service_1 = require("../../services/dashboard/dashboard.service");
let DashboardComponent = class DashboardComponent {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        // public lineChartLabels: Array<any> = ['', '', '', '', '', '', ''];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,0,0,1)',
                pointBackgroundColor: 'rgba(255,0,0,1)',
                pointBorderColor: 'rgba(255,0,0,1)',
                pointHoverBackgroundColor: 'rgba(255,0,0,1)',
                pointHoverBorderColor: 'rgba(255,0,0,1)'
            },
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(0,255,0,1)',
                pointBackgroundColor: 'rgba(0,255,0,1)',
                pointBorderColor: 'rgba(0,255,0,1)',
                pointHoverBackgroundColor: 'rgba(0,255,0,1)',
                pointHoverBorderColor: 'rgba(0,255,0,1)',
            },
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(0,0,255,1)',
                pointBackgroundColor: 'rgba(0,0,255,1)',
                pointBorderColor: 'rgba(0,0,255,1)',
                pointHoverBackgroundColor: 'rgba(0,0,255,1)',
                pointHoverBorderColor: 'rgba(0,0,255,1)'
            },
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(255, 165, 0,1)',
                pointBackgroundColor: 'rgba(255, 165, 0,1)',
                pointBorderColor: 'rgba(255, 165, 0,1)',
                pointHoverBackgroundColor: 'rgba(255, 165, 0,1)',
                pointHoverBorderColor: 'rgba(255, 165, 0,1)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.pieChartType = 'pie';
    }
    ngOnInit() {
        this.dashboardService.getDashboardData().subscribe((arrivedData) => {
            this.dashboardData = arrivedData;
            this.drawPieCharts();
        });
    }
    drawPieCharts() {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => this.drawPieChart1());
        google.charts.setOnLoadCallback(() => this.drawPieChart2());
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
};
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: './dashboard.component.html'
    }),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map