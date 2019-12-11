import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/_services/bike.service';
import { Bike } from 'src/app/_models/bike';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {
  bikes: Bike[];

  constructor(private bikeService: BikeService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadBikes();
  }

  loadBikes() {
    this.bikeService.getBikes().subscribe((bikes: Bike[]) => {
      this.bikes = bikes;
    }, error => {
      this.alertify.error(error);
    });
  }
}
