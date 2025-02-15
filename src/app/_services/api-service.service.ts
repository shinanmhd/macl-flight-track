import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { IFlight } from '../_interface/iflight';
import { IFlightDetail } from '../_interface/iflight-detail';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private flightsApiUrl = 'assets/data/flights.json';
  private flightDetailsApiUrl = 'assets/data/flight-details.json';

  constructor(private http: HttpClient) { }

  getFlights(): Observable<IFlight[]> {
    return this.http.get<IFlight[]>(this.flightsApiUrl).pipe(delay(2500)); // 500ms delay
  }

  getFlightById(id: number): Observable<IFlight | undefined> {
    return this.getFlights().pipe(
      delay(500), // Simulate API delay
      map(flights => flights.find(flight => flight.id === id))
    );
  }

  getFlightDetails(): Observable<IFlightDetail[]> {
    return this.http.get<IFlightDetail[]>(this.flightDetailsApiUrl);
  }

  getFlightDetail(id: number): Observable<IFlightDetail | undefined> {
    return this.getFlightDetails().pipe(
      map(detail => detail.find(flight_detail => flight_detail.id === id))
    );
  }
}
