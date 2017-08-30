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
const websites_service_1 = require("../../services/websites/websites.service");
let WebsitesComponent = class WebsitesComponent {
    constructor(websitesService) {
        this.websitesService = websitesService;
    }
    ngOnInit() {
        this.websitesService.getWebsitesData().subscribe((arrivedData) => {
            this.websitesData = arrivedData;
            this.drawPieCharts();
        });
    }
    drawPieCharts() {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => this.drawClicksChart());
        google.charts.setOnLoadCallback(() => this.drawImpressionsChart());
    }
    drawClicksChart() {
        let arrX = new Array(this.websitesData.length);
        for (var i = 0; i < this.websitesData.length; i++) {
            arrX[i] = new Array(2);
            arrX[i][0] = this.websitesData[i].website;
            arrX[i][1] = this.websitesData[i].clicks;
        }
        arrX.unshift(['website', 'Clicks']);
        var data = google.visualization.arrayToDataTable(arrX);
        var options = {
            title: 'Clicks Distribution'
        };
        var chart = new google.visualization.PieChart(document.getElementById('clicksChart'));
        chart.draw(data, options);
    }
    drawImpressionsChart() {
        let arrX = new Array(this.websitesData.length);
        for (var i = 0; i < this.websitesData.length; i++) {
            arrX[i] = new Array(2);
            arrX[i][0] = this.websitesData[i].website;
            arrX[i][1] = this.websitesData[i].impressions;
        }
        arrX.unshift(['website', 'Impressions']);
        var data = google.visualization.arrayToDataTable(arrX);
        var options = {
            title: 'Impressions Distribution'
        };
        var chart = new google.visualization.PieChart(document.getElementById('impressionsChart'));
        chart.draw(data, options);
    }
};
WebsitesComponent = __decorate([
    core_1.Component({
        selector: 'websites',
        templateUrl: './websites.component.html'
    }),
    __metadata("design:paramtypes", [websites_service_1.WebsitesService])
], WebsitesComponent);
exports.WebsitesComponent = WebsitesComponent;
//# sourceMappingURL=websites.component.js.map