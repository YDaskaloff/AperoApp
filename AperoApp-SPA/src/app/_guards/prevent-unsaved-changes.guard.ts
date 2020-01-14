import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditBikeComponent } from '../bikes-root/edit-bike/edit-bike.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<EditBikeComponent> {
    canDeactivate(component: EditBikeComponent) {
        if (component.bikeEditForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
