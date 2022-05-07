import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-booking-details',
  templateUrl: './view-booking-details.component.html',
  styleUrls: ['./view-booking-details.component.css']
})
export class ViewBookingDetailsComponent implements OnInit {

  driversData: any;
  vehiclesData: any;
  booking_id: string = "";

  api_base_url = environment.api_base_url;

  getResponse;
  getInquiryData;
  bookingPostApiUrl = this.api_base_url + 'booking/';
  inquiryApiUrl = this.api_base_url + 'inquiry/';

  optionAccountType: number = 0;

  driver: string = "";
  driver_id: string = "";
  name: string = "";
  email: string = "";
  pLocation: string = "";
  pdate: string = "";
  ptime: string = "";
  passenger: string = "";
  pnumber: string = "";
  dlocation: string = "";
  ddate: string = "";
  dtime: string = "";
  vehicle: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }

    // Get url parameters
    this.activatedRoute.queryParams.subscribe(params => {

      let id = params['id'];

      if (id) {

        this.booking_id = id;

      }

    });

  }

  ngOnInit(): void {

    // this.getDrivers();
    this.getDrivers().subscribe(data => {
      this.driversData = data;
    });

    this.getInquiryDetails().subscribe(data => {
      this.vehicle = data[0].vehicle_no
      this.name = data[0].full_name
      this.email = data[0].email
      this.pLocation = data[0].pick_up_location
      this.pdate = data[0].pick_up_date
      this.ptime = data[0].pick_up_time
      this.passenger = data[0].no_of_passengers
      this.pnumber = data[0].contact_no
      this.dlocation = data[0].drop_off_location
      this.ddate = data[0].drop_off_date
      this.dtime = data[0].drop_off_time
      this.driver = data[0].driver_id + " " + data[0].driver_first_name + " " + data[0].driver_last_name + " "
    });

  }


  // Get data from api
  getDrivers() {
    let apiUrl = this.api_base_url + 'driver/drivers_names';
    return this.http.get(apiUrl);
  }

  // Get data from api
  getInquiryDetails() {

    let apiUrl = this.api_base_url + 'booking/' + this.booking_id;
    return this.http.get(apiUrl);

  }

  optionSelectAccountType(id: number) {
    console.log(id);
    console.log(this.optionAccountType)
  }

  updateBooking() {

    if (this.driver_id == "") {
      this.warningMsg('Select updated driver!');

    } else {

      var data = {
        driver_id: this.driver_id,
      }

      let apiUrl = this.bookingPostApiUrl + "/driver/" + this.booking_id
      this.http.put<any>(apiUrl, data).subscribe(data => {
        this.getResponse = data;

        if (this.getResponse.status == "success") {
          this.successMsg(this.getResponse.msg)

        } else {
          this.warningMsg(this.getResponse.msg)
        }

      })
    }
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
