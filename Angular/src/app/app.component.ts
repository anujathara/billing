import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './shared/broadcast-service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  showSpinner: boolean;

  constructor(private spinner: SpinnerService) {

  }

  ngOnInit() {
    this.spinner.subject.subscribe((display: boolean) => {
      setTimeout(() => {
        this.showSpinner = display;
      });
    })
   }
}
