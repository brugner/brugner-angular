import { Component } from '@angular/core';
import { MonitoringService } from './services/monitoring.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bruner';

  constructor(private monitoringService: MonitoringService) {

  }
}
