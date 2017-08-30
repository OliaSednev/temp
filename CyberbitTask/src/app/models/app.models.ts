export interface Data {
    device_groups: DeviceGroup[];
    protocols: Protocol[];
    times: TimePeriod[];
}

export interface DeviceGroup {
    id: string;
    name: string;
    devices: Device[];
}

export interface Device {
    id: string;
    name: string;
    status: string;
    state: boolean;
}

export interface Protocol {
    id: string;
    name: string;
    state: boolean;
}

export interface TimePeriod {
    id: string;
    name: string;
}
