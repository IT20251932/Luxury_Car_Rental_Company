import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  getData;
  getData2;
  searchValue: string = "";
  api_base_url = environment.api_base_url;

  constructor(private http: HttpClient, private router: Router) {

    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {

    this.getApiData().subscribe(data => {
      this.getData = data;
      this.getData2 = data;
    });

  }


  // Get data from api
  getApiData() {

    let apiUrl = this.api_base_url + 'booking/';
    return this.http.get(apiUrl);

  }

  deleteBooking(id: string) {


    Swal.fire({
      title: 'Are you sure?',
      text: "Do you won't delete " + id + "!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        let apiUrl = this.api_base_url + 'booking/' + id;
        return this.http.delete(apiUrl).subscribe(resData => {

          if (resData['status'].toString() == "success") {

            this.successMsg(resData['msg'].toString())
            location.reload();

          } else {
            this.warningMsg(resData['msg'].toString())
          }

        });

      }
    })

  }

  doneBooking(id: string) {

    let apiUrl = this.api_base_url + 'booking/' + id;
    let data = {
      status: 1
    }
    return this.http.put(apiUrl, data).subscribe(resData => {

      if (resData['status'].toString() == "success") {

        this.successMsg(resData['msg'].toString())
        location.reload();

      } else {
        this.warningMsg(resData['msg'].toString())
      }

    });

  }


  warningMsg(msg: string) {

    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: msg
    })
  }

  successMsg(msg: string) {

    Swal.fire({
      icon: 'success',
      title: 'Success...',
      text: msg
    })
  }

  search(value) {

    if (value != "") {
      this.getData = []

      for (let i = 0; i < this.getData2.length; i++) {

        if ((this.getData2[i].driver_first_name).toLowerCase().includes(value) || (this.getData2[i].driver_last_name).toLowerCase().includes(value) ||
          (this.getData2[i].full_name).toLowerCase().includes(value) || (this.getData2[i].vehicle_no).toLowerCase().includes(value)
          || (this.getData2[i].contact_no).toLowerCase().includes(value) || (this.getData2[i].email).toLowerCase().includes(value)) {

          this.getData.push(this.getData2[i]);

        }
      }

    } else {

      this.getData = this.getData2;

    }

  }

}
