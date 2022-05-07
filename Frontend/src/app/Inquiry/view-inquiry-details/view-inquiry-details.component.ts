import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-inquiry-details',
  templateUrl: './view-inquiry-details.component.html',
  styleUrls: ['./view-inquiry-details.component.css']
})
export class ViewInquiryDetailsComponent implements OnInit {

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
  vehicle:string = "";

  inquiry_id: string = "";

  date_today = new Date().toString();

  getResponse;
  api_base_url = environment.api_base_url;

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {

    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }

    // Get url parameters
    this.activatedRoute.queryParams.subscribe(params => {

      let id = params['id'];

      if (id) {

        this.inquiry_id = id;

      }

    });

  }

  ngOnInit(): void {

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
    });

  }

  // Get data from api
  getInquiryDetails() {

    let apiUrl = this.api_base_url + 'inquiry/' + this.inquiry_id;
    return this.http.get(apiUrl);

  }

}
