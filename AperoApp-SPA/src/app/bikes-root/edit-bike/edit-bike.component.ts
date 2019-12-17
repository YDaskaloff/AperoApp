import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Bike } from 'src/app/_models/bike';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.css']
})
export class EditBikeComponent implements OnInit {
  @ViewChild('bikeEditForm', {static: true}) bikeEditForm: NgForm;
    bike: Bike;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.bikeEditForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.bike = data['bike'];
    });
  }

  updateBike() {
    console.log(this.bike);
    this.alertify.success('Bike updated successfully');
    this.bikeEditForm.reset(this.bike);
  }
}
