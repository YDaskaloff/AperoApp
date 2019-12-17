import { Component, OnInit, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BikeService } from 'src/app/_services/bike.service';
import { Photo } from 'src/app/_models/photo';
import { Bike } from 'src/app/_models/bike';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [ NgbCarouselConfig ]
})
export class SliderComponent implements OnInit {
  @Input() photosFromBikeDetailed: Photo[];
  @Input() bikeFromBikeDetailed: Bike;
  bike: Bike;

  constructor(config: NgbCarouselConfig, private bikeService: BikeService) {
    // customize default values of carousels used by this component tree
    config.interval = 0;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }


  ngOnInit() {
    this.bike = this.bikeFromBikeDetailed;
  }
 
}
