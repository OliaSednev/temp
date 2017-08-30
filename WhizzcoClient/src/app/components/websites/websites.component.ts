import {Component} from '@angular/core';
import {WebsitesService} from '../../services/websites/websites.service';
import {WebsiteData} from '../../models/app.models';

@Component({
    selector: 'websites',
    templateUrl: './websites.component.html'
})
export class WebsitesComponent {
    websitesData: WebsiteData[];

    constructor(private websitesService: WebsitesService) {
    }

    ngOnInit(): void {
        this.websitesService.getWebsitesData().subscribe((arrivedData: WebsiteData[]) => {
            this.websitesData = arrivedData;

            this.drawPieCharts();
        });
    }

    drawPieCharts() {

        google.charts.load('current', {'packages': ['corechart']});

        google.charts.setOnLoadCallback(() => this.drawClicksChart());

        google.charts.setOnLoadCallback(()=>this.drawImpressionsChart());
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
}

