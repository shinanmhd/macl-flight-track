import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../_services/storage-service.service';
import { IFlight } from '../_interface/iflight';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { ViewFlightModalPage } from '../view-flight-modal/view-flight-modal.page';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  standalone: false,
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements ViewDidEnter {

  private readonly SAVED_FLIGHTS_KEY = 'saved_flights';
  saved_flights: IFlight[] = [] as IFlight[];

  constructor(
    private modalCtrl: ModalController,
    private storageService: StorageServiceService
  ) {}

  ionViewDidEnter(): void {
    this.loadData();
  }

  loadData() {
    this.storageService.getSavedFlights().then(saved => {
      if(saved)
        this.saved_flights = saved
    })
  }

  async presentModal(flight: IFlight) {
    const modal = await this.modalCtrl.create({
      component: ViewFlightModalPage,
      componentProps: {
        flight: flight
      }
    });
    await modal.present();

    modal.addEventListener("ionModalWillDismiss",() => {
      this.loadData();
    });
  }

  async showLocalNotification() {
    await LocalNotifications.schedule({
        notifications: [
            {
                title: "FlightTrack",
                body: "Flight Saved",
                id: Math.ceil(Math.random() * 100), // any random int
                schedule: { at: new Date(Date.now() + 1000 * 5) },
                // sound: null,
                ongoing: false // (optional, default: false)
                //if ongoing:true, this notification can't be cleared
            }
        ]
    });
  }


  removeFlight(flightId: number) {
    let savedFlights: IFlight[] = [] as IFlight[];

    this.storageService.getSavedFlights().then(data => {
      if(data) { 
        savedFlights = data;
        savedFlights = savedFlights.filter(flight => flight.id !== flightId);
        this.storageService.set(this.SAVED_FLIGHTS_KEY, savedFlights);
      }
    });

    this.loadData();
  }


}
