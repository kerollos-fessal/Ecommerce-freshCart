import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  showAlert(msg: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${msg}`,
      showConfirmButton: false,
      timer: 1600,
    });
  }
}
