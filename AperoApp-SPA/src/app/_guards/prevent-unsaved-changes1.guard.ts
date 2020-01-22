import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddNewBikeComponent } from '../bikes-root/add-new-bike/add-new-bike.component';

@Injectable()
export class PreventUnsavedChanges1 implements CanDeactivate<AddNewBikeComponent> {
    canDeactivate(component: AddNewBikeComponent) {
        if (component.addBikeForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
