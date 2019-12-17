import { Injectable } from '@angular/core';
import { Bike } from '../_models/bike';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EditBikesService } from '../_services/editBikes.service';

@Injectable()
export class EditBikeResolver implements Resolve<Bike> {

    constructor(private editBikeService: EditBikesService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Bike> {
        return this.editBikeService.getBike(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/edit-bikes']);
                return of(null);
            })
        );
    }
}