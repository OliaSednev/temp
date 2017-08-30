import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DashboardData} from "../../models/app.models";
import {NetService} from "../net/net.service";

@Injectable()
export class DashboardService {

    constructor(private net: NetService) {

    }

    getDashboardData() : Observable<DashboardData> {
        return this.net.getDashboardData();
    }

    // getGraphData()
    // getPieChartData1()
    // getPieChartData2()

}