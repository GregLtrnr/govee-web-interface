import axios, { AxiosInstance } from "axios";
import { getAllDevicesForAccountResponse } from "@/types/govee";

export default class GoveeService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://developer-api.govee.com/v1/devices",
      headers: {
        "Govee-API-Key": import.meta.env.VITE_GOVEE_API_KEY,
      },
    });
  }

  public async getAllDevicesForAccount() {
    const { data } = await this.client.get<getAllDevicesForAccountResponse>("");
    return data.data.devices;
  }

  public async getDeviceState(device: string, model: string) {
    const { data } = await this.client.get(`?device=${device}&model=${model}`);
    return data;
  }

  public async turnDeviceOn(device: string, model: string) {
    const { data } = await this.client.put(`/control`, {
      device,
      model,
      cmd: { name: "turn", value: "on" },
    });
    return data;
  }

  public async turnDeviceOff(device: string, model: string) {
    const { data } = await this.client.put(`/control`, {
      device,
      model,
      cmd: { name: "turn", value: "off" },
    });
    return data;
  }

  public async setBrightness(device: string, model: string, brightness: number) {
    const { data } = await this.client.put(`/control`, {
      device,
      model,
      cmd: { name: "brightness", value: brightness },
    });
    return data;
  }

  public async setColor(device: string, model: string, color: { r: number; g: number; b: number }) {
    const { data } = await this.client.put(`/control`, {
      device,
      model,
      cmd: { name: "color", value: color },
    });
    return data;
  }

  public async setLightTemperature(device: string, model: string, temperature: number) {
    const { data } = await this.client.put(`/control`, {
      device,
      model,
      cmd: { name: "colorTem", value: temperature },
    });
    return data;
  }
}
