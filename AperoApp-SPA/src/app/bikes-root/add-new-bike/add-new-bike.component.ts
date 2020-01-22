import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Bike } from 'src/app/_models/bike';
import { EditBikesService } from 'src/app/_services/editBikes.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-bike',
  templateUrl: './add-new-bike.component.html',
  styleUrls: ['./add-new-bike.component.css']
})
export class AddNewBikeComponent implements OnInit {
  @ViewChild('addBikeForm', {static: true}) addBikeForm: NgForm;
  model: any = {};
  defForm: any = {
    gears: 0,
    basket: false,
    weight: 0,
    wheelSize: 0,
    bikerHeight: 0,
    luggageRack: false
  };

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.addBikeForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private ebService: EditBikesService, private alertify: AlertifyService, 
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  addNewBike() {
    console.log(this.model);
    this.ebService.addNewBike(this.model).subscribe(next => {
      this.alertify.success('Bike created');
      this.addBikeForm.reset(this.defForm);
    }, error => {
      this.alertify.error(error);
    });
  }
}
