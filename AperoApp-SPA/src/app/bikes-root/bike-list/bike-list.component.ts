import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/_services/bike.service';
import { Bike } from 'src/app/_models/bike';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit {
  bikes: Bike[];

  constructor(private bikeService: BikeService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.bikes = data['bikes'];
    });
  }

  loadBikes() {
    this.bikeService.getBikes().subscribe((bikes: Bike[]) => {
      this.bikes = bikes;
    }, error => {
      this.alertify.error(error);
    });
  }
}
