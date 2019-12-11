import { Component, OnInit, Input } from '@angular/core';
import { Bike } from 'src/app/_models/bike';

@Component({
  selector: 'app-bike-card',
  templateUrl: './bike-card.component.html',
  styleUrls: ['./bike-card.component.css']
})
export class BikeCardComponent implements OnInit {
  @Input() bike: Bike;

  constructor() { }

  ngOnInit() {
  }

}
