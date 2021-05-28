import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	constructor() {}

	success(message: string) {
		return Swal.fire({
			icon: 'success',
			title: message,
			showConfirmButton: true,
			timer: 3000,
		});
	}

	question(callback: () => any, message: string, title?: string) {
		return Swal.fire({
			title: title ? title : 'Estas seguro?',
			text: message,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, hazlo!',
		}).then((result) => {
			if (result.isConfirmed) {
				callback();
			}
		});
	}

	error(message: string) {
		return Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: message,
		});
	}
}
