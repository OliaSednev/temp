import {Injectable} from '@angular/core';

declare var toastr: any;

@Injectable()
export class ToastService {
    success(message: string) {
        toastr.success(message);
    }

    info(message: string) {
        toastr.info(message);
    }
}
