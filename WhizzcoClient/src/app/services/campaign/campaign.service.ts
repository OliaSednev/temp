import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CampaignData} from "../../models/app.models";
import {NetService} from "../net/net.service";

@Injectable()
export class CampaignService {

    constructor(private net: NetService) {

    }

    getCampaignData(id: string) : Observable<CampaignData[]> {
        return this.net.getCampaignData(id);
    }
}