import {Component} from '@angular/core';
import {CampaignService} from '../../services/campaign/campaign.service';
import {CampaignData} from '../../models/app.models';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'campaign',
    templateUrl: './campaign.component.html'
})

export class CampaignComponent {
    campaignData: CampaignData[];
    pieChartLabels?: string[];
    clicksChartData?: number[];
    impressionsChartData?: number[];
    public chartType:string = 'pie';
        //'doughnut';

    constructor(private campaignService: CampaignService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {

        this.activatedRoute.params.forEach((params: Params) => {
            let websiteId = params['name'];

            this.campaignService.getCampaignData(websiteId).subscribe((arrivedData: CampaignData[]) => {
                this.campaignData = arrivedData;

                this.createChartsData();
            });
        });
    }

    createChartsData() {
        this.pieChartLabels = [];
        this.clicksChartData = [];
        this.impressionsChartData = [];

        for (let campaign of this.campaignData) {
            this.pieChartLabels.push(campaign.brand);
            this.clicksChartData.push(campaign.clicks);
            this.impressionsChartData.push(campaign.impressions);
        }
    }

    public randomizeType():void {
        switch(this.chartType)
        {
            case 'pie':
                this.chartType = 'doughnut';
                break;
            case 'doughnut':
                this.chartType = 'bar';
                break;
            case 'bar':
                this.chartType = 'line';
                break;
            case 'line':
                this.chartType = 'pie';
                break;
        }
    }
}
