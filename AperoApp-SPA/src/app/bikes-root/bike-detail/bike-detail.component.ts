import { Component, OnInit } from '@angular/core';
import { Bike } from 'src/app/_models/bike';
import { BikeService } from 'src/app/_services/bike.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';

@Component({
  selector: 'app-bike-detail',
  templateUrl: './bike-detail.component.html',
  styleUrls: ['./bike-detail.component.css']
})
export class BikeDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  bike: Bike;
  photos: Photo[];

  constructor(private bikeService: BikeService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.bike = data['bike'];
    });

    this.galleryOptions = [
      {
        width: '700px',
        height: '500px',
        imageSize: NgxGalleryImageSize.Contain,
        thumbnailsColumns: 4,
        thumbnailsPercent: 20,
        thumbnailSize: NgxGalleryImageSize.Contain,
        thumbnailMargin: 10,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.bike.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  // loadBike() {
  //   this.bikeService.getBike(+this.route.snapshot.params['id']).subscribe((bike: Bike) => {
  //     this.bike = bike;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
