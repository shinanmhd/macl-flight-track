import { AfterContentInit, Component, OnInit } from '@angular/core';

import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
import { StorageServiceService } from '../_services/storage-service.service';


@Component({
  standalone: false,
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, AfterContentInit {

  // storage_value: string | undefined | Promise<any> = 'nothing';

  paletteToggle = false;
  pushNotificationsToggle = false;

  constructor(private storageService: StorageServiceService) {
    /**
     * Any icons you want to use in your application
     * can be registered in app.component.ts and then
     * referenced by name anywhere in your application.
     */
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline, 'app_settings': 'assets/images/icons/settings.svg' });
  }

  ngAfterContentInit(): void {
    this.loadStorageData();
  }

  async loadStorageData() {
    this.paletteToggle = await this.storageService.get("dark_mode");
    this.toggleDarkPalette(this.paletteToggle);
  }

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    document.documentElement.classList.toggle('dark', shouldAdd);
    document.body.classList.toggle('dark', shouldAdd);
    this.storageService.set('dark_mode', shouldAdd);
  }

}
