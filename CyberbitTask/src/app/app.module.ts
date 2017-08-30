// Modules (imports)
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BsDropdownModule, CollapseModule} from 'ngx-bootstrap';
import {RootComponent} from './components/root/root.component';
import {DeviceGroupComponent} from './components/device-group/device-group.component';
import {SelectionsSummaryComponent} from './components/selections-summary/selections-summary.component';
import {TimePeriodComponent} from './components/time-period/time-period.component';
import {ProtocolsComponent} from './components/protocols/protocols.component';
// Services (providers)
import {DataService} from './services/data/data.service';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, BsDropdownModule.forRoot(), CollapseModule.forRoot()],
    declarations: [RootComponent, DeviceGroupComponent, TimePeriodComponent, ProtocolsComponent, SelectionsSummaryComponent],
    providers: [DataService],
    bootstrap: [RootComponent]
})
export class AppModule {
}
