import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayStyle = "none";
  loginShow = true;
  logoutShow = false;
  getData;
  getData2;
  searchValue: string = "";
  selectedItemData;
  api_base_url = environment.api_base_url;
  image_location = this.api_base_url + "images/"

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    if (localStorage.getItem('useremail') != null) {

      this.loginShow = false;
      this.logoutShow = true;

    } else {

      this.loginShow = true;
      this.logoutShow = false;

    }

  }

  ngOnInit(): void {

    this.getApiData().subscribe(data => {
      this.getData = data;
      this.getData2 = data;

      let item_details = this.getData[0]
      this.selectedItemData = item_details;


    });

  }

  showModel(item_id: string) {

    let item_index = this.getData.findIndex(x => x.id === item_id);
    let item_details = this.getData[item_index]
    this.selectedItemData = item_details;
    this.displayStyle = "block";
  }

  closeModel() {
    this.displayStyle = "none";
  }

  addInquiryPage(id: string, vehicle_no: string) {

    if (localStorage.getItem('useremail') == null) {
      this.router.navigate(['/user-authentication']);
    }
    else {

      this.router.navigate(['/admin/inquiry/add-inquiry'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          id: id
        }
      });

    }
  }

  getApiData() {

    let apiUrl = this.api_base_url + 'vehicle/';
    return this.http.get(apiUrl);

  }

  logout() {
    localStorage.removeItem("useremail");

    this.loginShow = true;
    this.logoutShow = false;
    this.router.navigate(['/index']);

  }

  search(value) {

    if (value != "") {
      this.getData = []



      for (let i = 0; i < this.getData2.length; i++) {

        if ((this.getData2[i].vehicle_type).toLowerCase().includes(value) || (this.getData2[i].vehicle_color).toLowerCase().includes(value)
          || (this.getData2[i].no_of_sheets).toLowerCase().includes(value) || (this.getData2[i].price_per_hour).toLowerCase().includes(value)) {

          this.getData.push(this.getData2[i]);

        }
      }

    } else {

      this.getData = this.getData2;

    }

  }

}
