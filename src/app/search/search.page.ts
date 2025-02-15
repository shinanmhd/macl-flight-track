import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFlight } from '../_interface/iflight';
import { ApiServiceService } from '../_services/api-service.service';
import { ViewFlightModalPage } from '../view-flight-modal/view-flight-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  flight: string = '';
  destination: string = '';
  status: 'On-time' | 'Delayed' | 'Cancelled' | 'Boarding' | null = null;

  show_search_form = true;

  flights: IFlight[] = [];
  filteredFlights: IFlight[] = [];
  loading: boolean = true;
  
  constructor(
    private apiService: ApiServiceService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.loadFlights()
  }

  loadFlights() {
    this.loading = true;
    this.apiService.getFlights().subscribe(flights => {
      this.flights = flights;
      // this.filterFlights();
      this.loading = false;
    });
  }

  filterFlights() {
    this.loading = true;
    this.filteredFlights = this.flights.filter(flight => {
      // Filter by flight number (if flight is set)
      const flightMatch = this.flight? flight.flightCode.toLowerCase().includes(this.flight.toLowerCase()): true;

      // Filter by destination (if destination is set)
      const destinationMatch = this.destination? flight.toCountry.toLowerCase().includes(this.destination.toLowerCase()): true;

      // Filter by status (if status is set)
      const statusMatch = this.status? flight.status.name === this.status: true; // Assuming status is a string in IFlight

      return flightMatch && destinationMatch && statusMatch;
    });
    this.loading = false;
    this.show_search_form = false;
  }


  onFlightFilterChange(event: any) {
    this.flight = event.target.value;
    this.filterFlights();
    this.show_search_form = false;
  }

  onDestinationFilterChange(event: any) {
    this.destination = event.target.value;
    this.filterFlights();
  }

  onStatusFilterChange(event: any) {
    this.status = event.target.value;
    this.filterFlights();
  }

  toggleSearchForm() {
    this.show_search_form = !this.show_search_form;
  }

  async presentModal(flight: IFlight) {
    const modal = await this.modalCtrl.create({
      component: ViewFlightModalPage,
      componentProps: {
        flight: flight
      }
    });
    await modal.present();
  }
}
