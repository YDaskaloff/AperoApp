import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EditBikeComponent } from '../bikes-root/edit-bike/edit-bike.component';
import { AddNewBikeComponent } from '../bikes-root/add-new-bike/add-new-bike.component';
import { EditProfileComponent } from '../members/edit-profile/edit-profile.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<EditBikeComponent | AddNewBikeComponent> {
    canDeactivate(component: EditBikeComponent | AddNewBikeComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
