export interface IFlightDetail {
    id: number; // Or string, depending on your ID type
    flightCode: string;
    airline: string;
    departure: IDepartureDetail;
    arrival: IArrivalDetail;
}

export interface IDepartureDetail {
    airportCode: string;
    airportName: string;
    estimatedTime: string;
    scheduledTime: string;
    terminal: string;
    gate: string;
    checkinCounter: string;
}

export interface IArrivalDetail {
    airportCode: string;
    airportName: string;
    estimatedTime: string;
    scheduledTime: string;
    terminal: string;
    gate: string;
    baggageClaim: string;
}