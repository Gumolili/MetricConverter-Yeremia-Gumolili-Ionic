import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  inputValue: number = 0;
  fromUnit: string = 'm';
  toUnit: string = 'cm';
  result: number | null = null;

  constructor(private toastController: ToastController) {}

  private toMeter(value: number, unit: string): number {
    switch (unit) {
      case 'mm': return value / 1000;
      case 'cm': return value / 100;
      case 'm': return value;
      case 'km': return value * 1000;
      default: return value;
    }
  }

  private fromMeter(value: number, unit: string): number {
    switch (unit) {
      case 'mm': return value * 1000;
      case 'cm': return value * 100;
      case 'm': return value;
      case 'km': return value / 1000;
      default: return value;
    }
  }

  async convert() {
    if (this.inputValue !== null && this.inputValue !== undefined) {
      const inMeters = this.toMeter(this.inputValue, this.fromUnit);
      this.result = this.fromMeter(inMeters, this.toUnit);
      
      // Menampilkan toast setelah konversi
      const toast = await this.toastController.create({
        message: 'Conversion completed!',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Please enter a valid number',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      toast.present();
    }
  }
}