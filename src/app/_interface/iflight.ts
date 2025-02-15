import { IFlightStatus } from "./iflight-status";

export interface IFlight {
    id: number;
    airline: string;
    flightCode: string;
    fromCountry: string;
    fromTime: string;
    toCountry: string;
    toTime: string;
    tripDuration: string;
    terminal: string;
    gate: string;
    updated: string;
    status: IFlightStatus;
  }