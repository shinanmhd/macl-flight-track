import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceService } from '../_services/api-service.service';
import { IFlightDetail } from '../_interface/iflight-detail';
import { IFlight } from '../_interface/iflight';
import { StorageServiceService } from '../_services/storage-service.service';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  standalone: false,
  selector: 'app-view-flight-modal',
  templateUrl: './view-flight-modal.page.html',
  styleUrls: ['./view-flight-modal.page.scss'],
})
export class ViewFlightModalPage implements OnInit {

  private readonly SAVED_FLIGHTS_KEY = 'saved_flights';

  flight: IFlight = {} as IFlight;
  flight_detail: IFlightDetail | undefined = {} as IFlightDetail;

  isFlightAlreadySaved = false;

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiServiceService,
    private storageService: StorageServiceService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if(this.flight && this.flight.id)
      {
        this.apiService.getFlightDetail(this.flight.id).subscribe(details => {
          if(!details || details === undefined)
            this.cancel();
  
          this.flight_detail = details;
          this.isSavedFlight();
        });
      } else {
        this.cancel();
      }
  }

  saveFlight(flight: IFlight) {
    let isFlightAlreadySaved = false;
    let savedFlights: IFlight[] = [] as IFlight[];

    this.storageService.getSavedFlights().then(data => {
      if(data) { 
        savedFlights = data;

        isFlightAlreadySaved = savedFlights.find(savedFlight => savedFlight.id === flight.id) ? true : false;

        if (!isFlightAlreadySaved) {  // Only add if not already saved
          savedFlights.push(flight);  // Add the new flight
          this.storageService.set(this.SAVED_FLIGHTS_KEY, savedFlights)
          this.isFlightAlreadySaved = true;

          this.showLocalNotification();
        } else {
          console.log("Flight is already saved!")
        }
      } else {
        this.storageService.set(this.SAVED_FLIGHTS_KEY, [flight]);
        this.isFlightAlreadySaved = true;

        this.showLocalNotification();
      }
    });

    this.isSavedFlight();
  }

  isSavedFlight()
  {
    let savedFlights: IFlight[] = [] as IFlight[];

    this.storageService.getSavedFlights().then(data => {
      if(data) { 
        savedFlights = data;
        savedFlights.map(savedFlight => {
          if (this.flight.id === savedFlight.id)
          {
            this.isFlightAlreadySaved = true;
          }
        })
      }
    });
  }

  removeFlight(flightId: number) {
    let savedFlights: IFlight[] = [] as IFlight[];

    this.storageService.getSavedFlights().then(data => {
      if(data) { 
        savedFlights = data;
        savedFlights = savedFlights.filter(flight => flight.id !== flightId);
        this.storageService.set(this.SAVED_FLIGHTS_KEY, savedFlights);

        this.isFlightAlreadySaved = false;
      }
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  async showLocalNotification() {
    await LocalNotifications.schedule({
        notifications: [
            {
                title: "MACL FlightTrack",
                body: "Flight added to your Saved Flights!",
                id: Math.ceil(Math.random() * 100), // any random int
                schedule: { at: new Date(Date.now() + 1000 * 5) },
                // sound: null,
                ongoing: false // (optional, default: false)
                //if ongoing:true, this notification can't be cleared
            }
        ]
    });
  }

}
