import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-vehicle-details',
  templateUrl: './view-vehicle-details.component.html',
  styleUrls: ['./view-vehicle-details.component.css']
})
export class ViewVehicleDetailsComponent implements OnInit {

  vehicle_no: string = "";
  vehicle_type: string = "";
  sheets: string = "";
  color: string = "";
  number: string = "";
  vehicle_id: string = "";
  owner_name: string = '';
  price_per_hour: string = '';

  api_base_url = environment.api_base_url;

  constructor(private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) {

    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }

    // Get url parameters
    this.activatedRoute.queryParams.subscribe(params => {

      let id = params['id'];

      if (id) {

        this.vehicle_id = id;

      }

    });

  }

  ngOnInit(): void {

    this.getVehicleDetails().subscribe(data => {
      this.vehicle_no = data[0].vehicle_no
      this.vehicle_type = data[0].vehicle_type
      this.sheets = data[0].no_of_sheets
      this.color = data[0].vehicle_color
      this.number = data[0].contact_no
      this.owner_name = data[0].owner_name
      this.price_per_hour = data[0].price_per_hour
    });

  }

  // Get data from api
  getVehicleDetails() {

    let apiUrl = this.api_base_url + 'vehicle/' + this.vehicle_id;
    return this.http.get(apiUrl);

  }

  updateVehicle() {

    if (this.vehicle_no == '' || this.vehicle_type == '' || this.sheets == '' ||
      this.color == '' || this.number == '') {
      this.warningMsg('Fields are empty!');

    } else if (this.number.length != 10) {
      this.warningMsg('Your mobile number not valid!');

    } else {

      var data = {
        vehicle_no: this.vehicle_no,
        vehicle_type: this.vehicle_type,
        no_of_sheets: this.sheets,
        vehicle_color: this.color,
        contact_no: this.number,
        owner_name: this.owner_name,
        price_per_hour: this.price_per_hour
      }

      let dataApiUrl = this.api_base_url + 'vehicle/' + this.vehicle_id;
      this.http.put<any>(dataApiUrl, data).subscribe(data => {
        let getResponse = data;

        if (getResponse.status == "success") {

          this.successMsg(getResponse.msg)

        } else {
          this.warningMsg(getResponse.msg)
        }

      })

    }

  }

  deleteVehicle() {

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

        let dataGetApiUrl = this.api_base_url + 'vehicle/' + this.vehicle_id;
        this.http.delete(dataGetApiUrl).subscribe(resData => {

          if (resData['status'].toString() == "success") {

            this.successMsg(resData['msg'].toString())
            this.router.navigate(['/admin/vehicle/view-vehicles']);

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
