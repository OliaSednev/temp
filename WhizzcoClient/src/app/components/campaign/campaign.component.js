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
const campaign_service_1 = require("../../services/campaign/campaign.service");
const router_1 = require("@angular/router");
let CampaignComponent = class CampaignComponent {
    //'doughnut';
    constructor(campaignService, activatedRoute) {
        this.campaignService = campaignService;
        this.activatedRoute = activatedRoute;
        this.chartType = 'pie';
    }
    ngOnInit() {
        this.activatedRoute.params.forEach((params) => {
            let websiteId = params['name'];
            this.campaignService.getCampaignData(websiteId).subscribe((arrivedData) => {
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
    randomizeType() {
        switch (this.chartType) {
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
};
CampaignComponent = __decorate([
    core_1.Component({
        selector: 'campaign',
        templateUrl: './campaign.component.html'
    }),
    __metadata("design:paramtypes", [campaign_service_1.CampaignService,
        router_1.ActivatedRoute])
], CampaignComponent);
exports.CampaignComponent = CampaignComponent;
//# sourceMappingURL=campaign.component.js.map