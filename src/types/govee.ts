export interface getAllDevicesForAccountResponse {
  data: getAllDevicesForAccountData;
  message: string;
  code: number;
}

export interface getAllDevicesForAccountData {
  devices: Device[];
}

export interface Device {
  device: string;
  model: string;
  deviceName: string;
  controllable: boolean;
  properties: Properties;
  retrievable: boolean;
  supportCmds: string[];
}

export interface Properties {
  colorTem: ColorTem;
}

export interface ColorTem {
  range: Range;
}

export interface Range {
  min: number;
  max: number;
}
