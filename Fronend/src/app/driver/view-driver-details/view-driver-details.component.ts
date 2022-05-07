import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-driver-details',
  templateUrl: './view-driver-details.component.html',
  styleUrls: ['./view-driver-details.component.css']
})
export class ViewDriverDetailsComponent implements OnInit {

  api_base_url = environment.api_base_url;

  driver_id: string = null;
  date: string = "";
  fname: string = "";
  lname: string = "";
  nic: string = "";
  license: string = "";
  phone: string = "";
  email: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) {

    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }

    // Get url parameters
    this.activatedRoute.queryParams.subscribe(params => {

      let driverId = params['id'];

      if (driverId) {

        this.driver_id = driverId;

      }

    });


  }

  ngOnInit(): void {

    this.getDriverDetails().subscribe(data => {
      this.date = data[0].registered_date
      this.fname = data[0].first_name
      this.lname = data[0].last_name
      this.nic = data[0].nic
      this.license = data[0].license_no
      this.phone = data[0].contact_no
      this.email = data[0].email
    });

  }


  // Get data from api
  getDriverDetails() {

    let apiUrl = this.api_base_url + 'driver/' + this.driver_id;
    return this.http.get(apiUrl);

  }

  updateDriver() {

    if (this.fname == '' || this.lname == '' || this.nic == '' ||
      this.license == '' || this.phone == '' || this.email == '') {
      this.warningMsg('Fields are empty!');

    } else if (this.phone.length != 10) {
      this.warningMsg('Your mobile number not valid!');

    } else if (![10, 12].includes(this.nic.length)) {
      this.warningMsg('Your nic not valid!');

    }
    else {

      var data = {
        first_name: this.fname,
        last_name: this.lname,
        nic: this.nic,
        license_no: this.license,
        contact_no: this.phone,
        email: this.email
      }

      let dataGetApiUrl = this.api_base_url + 'driver/' + this.driver_id;
      this.http.put<any>(dataGetApiUrl, data).subscribe(data => {
        let getResponse = data;

        if (getResponse.status == "success") {

          this.successMsg(getResponse.msg)

        } else {
          this.warningMsg(getResponse.msg)
        }

      })

    }

  }

  deleteDriver() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you won't delete!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        let dataGetApiUrl = this.api_base_url + 'driver/' + this.driver_id;
        this.http.delete(dataGetApiUrl).subscribe(resData => {

          if (resData['status'].toString() == "success") {

            this.successMsg(resData['msg'].toString())
            this.router.navigate(['/admin/driver/view-drivers']);

          } else {
            this.warningMsg(resData['msg'].toString())
          }

        })

      }
    })

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


}
