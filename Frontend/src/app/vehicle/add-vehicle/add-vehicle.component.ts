import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  vehicle_no: string = "";
  vehicle_type: string = "";
  no_seats: string = "";
  color: string = "";
  number: string = "";
  owner: string = "";
  price: string = "";

  filedata: File = null;

  getResponse;
  api_base_url = environment.api_base_url;

  vehiclePostApiUrl = this.api_base_url + 'vehicle/';

  constructor(private http: HttpClient,
    private router: Router) {

    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  fileEvent(e) {
    this.filedata = e.target.files[0];
  }

  addVehicle() {

    if (this.vehicle_no == '' || this.vehicle_type == '' || this.no_seats == '' ||
      this.color == '' || this.number == '' || this.owner == '' || this.price == '' || this.filedata == null) {
      this.warningMsg('Fields are empty!');

    } else if (this.number.length != 10) {
      this.warningMsg('Owner mobile number not valid!');

    } else {

      let file_name = this.filedata.name

      const formData = new FormData();
      formData.append("vehicle_no", this.vehicle_no);
      formData.append("vehicle_type", this.vehicle_type);
      formData.append("no_of_sheets", this.no_seats);
      formData.append("vehicle_color", this.color);
      formData.append("contact_no", this.number);
      formData.append("owner_name", this.owner);
      formData.append("price_per_hour", this.price);
      formData.append("image_name", file_name);
      formData.append("file", this.filedata, file_name);

      this.http.post<any>(this.vehiclePostApiUrl, formData).subscribe(data => {
        this.getResponse = data;

        if (this.getResponse.status == "success") {
          this.vehicle_no = "";
          this.vehicle_type = "";
          this.no_seats = "";
          this.color = "";
          this.number = "";
          this.owner = "";
          this.price = "";
          this.filedata = null;
          this.successMsg(this.getResponse.msg)
        } else {
          this.warningMsg(this.getResponse.msg)
        }

      })


    }

  }

  // logout
  logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    this.router.navigate(['/login']);
  }

  // Function for show warning massage
  warningMsg(msg: string) {

    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: msg
    })
  }

  // Function for show success massage
  successMsg(msg: string) {

    Swal.fire({
      icon: 'success',
      title: 'Success...',
      text: msg
    })
  }

}
