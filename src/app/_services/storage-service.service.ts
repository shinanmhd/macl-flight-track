import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { IFlight } from '../_interface/iflight';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  public readonly SAVED_FLIGHTS_KEY = 'saved_flights';

  constructor(private storage: Storage) {
    this.storage.create();
  }

  public async set(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    const data = await this.storage?.get(key);
    return data;
  }

  public async remove(key: string): Promise<void>{
    await this.storage?.remove(key);
  }

  public async clear(): Promise<void>{
    await this.storage?.clear();
  }

  async getSavedFlights(): Promise<IFlight[] | null> {

    const savedFlights = await this.get(this.SAVED_FLIGHTS_KEY);

    if (savedFlights) {
      try {

        if (Array.isArray(savedFlights)) {
          const iflightArray: IFlight[] = savedFlights.map((flight: any) => {
            return {
              id: flight.id, 
              flightCode: flight.flightCode || '', 
              airline: flight.airline || '',
              fromCountry: flight.fromCountry || '',
              fromTime: flight.fromTime || '',
              toCountry: flight.toCountry || '',
              toTime: flight.toTime || '',
              tripDuration: flight.tripDuration || '',
              terminal: flight.terminal || '',
              gate: flight.gate || '',
              updated: flight.updated || '',
              status: flight.status || {name: 'Unknown', color: 'gray'}, 
            };
          });

          return iflightArray;
        } else {
          console.error("Data retrieved from storage is not an array:", savedFlights);
          return null; 
        }
      } catch (error) {
        console.error("Error parsing saved flights from storage:", error);
        return null; 
      }
    }

    return null;
  }
}
