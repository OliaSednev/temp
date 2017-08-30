export interface DashboardData {
    impressisons: number;
    clicks: number;
    ctr: string; //%
    ecpm: string; //$
    pieChartData1 :PieChartData;
    pieChartData2 :PieChartData;
    lineChartData :LineChartData;
}

export interface LineChartData {
    lineChartData: Array<any>;
    lineChartLabels: Array<any>;
}
export interface PieChartData {
    pieChartLabels: string[];
    pieChartData: number[];
}

export interface WebsiteData {
    id: string;
    website: string;
    impressions: number;
    clicks: number;
}

export interface CampaignData {
    website: string;
    brand: string;
    impressions: number;
    clicks: number;
}


export interface User {
    user: {
        name: string;
        role: string;
        permissions: string[];
        // contact_details: {
        //     full_name: string;
        // }
    };
    token: string;
    expiresOn: Date;
}