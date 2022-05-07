import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  fname: string = "";
  lname: string = "";
  nic: string = "";
  lno: string = "";
  phone: string = "";
  email: string = "";

  date_today = new Date().toString();

  getResponse;
  api_base_url = environment.api_base_url;

  driverPostApiUrl = this.api_base_url + 'driver/';

  constructor(private http: HttpClient,
    private router: Router) {

    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }

    this.date_today = formatDate(this.date_today, 'dd-MM-yyyy', 'en-US').toString();

  }

  ngOnInit(): void { }

  addDriver() {

    if (this.fname == '' || this.lname == '' || this.nic == '' ||
      this.lno == '' || this.phone == '' || this.email == '') {
      this.warningMsg('Fields are empty!');

    } else if (this.isValidEmail(this.email) != true) {
      this.warningMsg('Your email not valid!');

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
        license_no: this.lno,
        contact_no: this.phone,
        email: this.email,
        registered_date: this.date_today
      }

      this.http.post<any>(this.driverPostApiUrl, data).subscribe(data => {
        this.getResponse = data;

        if (this.getResponse.status == "success") {
          this.fname = "";
          this.lname = "";
          this.nic = "";
          this.lno = "";
          this.phone = "";
          this.email = "";
          this.date_today = "";
          this.successMsg(this.getResponse.msg)

        } else {
          this.warningMsg(this.getResponse.msg)
        }

      })

    }

  }

  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Function for show massages
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
