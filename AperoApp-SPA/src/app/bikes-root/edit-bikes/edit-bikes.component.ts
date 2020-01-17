import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Bike } from 'src/app/_models/bike';
import { Router, ActivatedRoute } from '@angular/router';
import { EditBikesService } from 'src/app/_services/editBikes.service';

@Component({
  selector: 'app-edit-bikes',
  templateUrl: './edit-bikes.component.html',
  styleUrls: ['./edit-bikes.component.css']
})
export class EditBikesComponent implements OnInit {
  bikes: Bike[];

  constructor(private editBikesService: EditBikesService, private alertify: AlertifyService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.bikes = data['bikes'];
    });
  }

  deleteBike(id: number) {
    this.alertify.confirm('Think twice, cut once!', () => {
      this.editBikesService.deleteBike(id).subscribe(
        next => {
          this.alertify.success('Bike has been deleted');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.router.navigate(['/edit-bikes']);
        }
      );
    });
  }

  goToEditBike(id: number) {
    this.router.navigate(['/edit-bikes/' + id]);
  }
}
