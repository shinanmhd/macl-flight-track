import { AfterContentInit, Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../_services/storage-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements AfterContentInit {

  storage_value: boolean = false;

  constructor(private storageService: StorageServiceService) {}

  ngAfterContentInit(): void {
    this.loadStorageData();
  }

  async loadStorageData() {
    this.storage_value = await this.storageService.get("dark_mode");
    console.log(this.storage_value)
    this.toggleDarkPalette(this.storage_value)
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    document.documentElement.classList.toggle('dark', shouldAdd);
    document.body.classList.toggle('dark', shouldAdd);
    document.body.classList.toggle('ion-palette-dark', shouldAdd);
  }

}
