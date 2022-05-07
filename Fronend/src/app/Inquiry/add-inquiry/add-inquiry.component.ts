import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-inquiry',
  templateUrl: './add-inquiry.component.html',
  styleUrls: ['./add-inquiry.component.css']
})
export class AddInquiryComponent implements OnInit {

  name: string = "";
  email: string = localStorage.getItem('useremail');
  pLocation: string = "";
  pdate: string = "";
  ptime: string = "";
  passenger: string = "";
  pnumber: string = "";
  dlocation: string = "";
  ddate: string = "";
  dtime: string = "";

  vehicle_id: string = "";

  date_today = new Date().toString();

  getResponse;
  api_base_url = environment.api_base_url;

  inquiryPostApiUrl = this.api_base_url + 'inquiry/';

  constructor(private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    if (localStorage.getItem('useremail') == null) {
      this.router.navigate(['/index']);
    }

    this.date_today = formatDate(this.date_today, 'dd-MM-yyyy', 'en-US').toString();

    // Get url parameters
    this.activatedRoute.queryParams.subscribe(params => {

      let id = params['id'];

      if (id) {

        this.vehicle_id = id;

      }

    });

  }

  ngOnInit(): void { }

  addInquiry() {

    if (this.name == '' || this.email == '' || this.pLocation == '' ||
      this.pdate == '' || this.ptime == '' || this.passenger == '' ||
      this.pnumber == '' || this.dlocation == '' || this.ddate == '' || this.dtime == '') {
      this.warningMsg('Fields are empty!');

    } else if (this.isValidEmail(this.email) != true) {
      this.warningMsg('Your email not valid!');

    } else if (this.pnumber.length != 10) {
      this.warningMsg('Your mobile number not valid!');

    } else {

      var data = {
        full_name: this.name,
        pick_up_location: this.pLocation,
        pick_up_time: this.ptime,
        pick_up_date: this.pdate,
        drop_off_date: this.ddate,
        contact_no: this.pnumber,
        email: this.email,
        no_of_passengers: this.passenger,
        drop_off_location: this.dlocation,
        drop_off_time: this.dtime,
        vehicle_id: this.vehicle_id
      }

      this.http.post<any>(this.inquiryPostApiUrl, data).subscribe(data => {
        this.getResponse = data;

        if (this.getResponse.status == "success") {
          this.name = "";
          this.pLocation = "";
          this.ptime = "";
          this.pdate = "";
          this.ddate = "";
          this.pnumber = "";
          this.passenger = "";
          this.dlocation = "";
          this.dtime = "";
          this.successMsg(this.getResponse.msg)

        } else {
          this.warningMsg(this.getResponse.msg)
        }

      })

    }

  }

  returnToServicesPage() {
    this.router.navigate(['/index']);
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