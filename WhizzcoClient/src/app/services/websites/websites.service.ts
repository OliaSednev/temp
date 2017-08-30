import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {WebsiteData} from "../../models/app.models";
import {NetService} from "../net/net.service";

@Injectable()
export class WebsitesService {

    constructor(private net: NetService) {

    }

    getWebsitesData() : Observable<WebsiteData[]> {
        return this.net.getWebsitesData();
    }
}