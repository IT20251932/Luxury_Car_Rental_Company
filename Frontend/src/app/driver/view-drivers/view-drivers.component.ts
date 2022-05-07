import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-view-drivers',
  templateUrl: './view-drivers.component.html',
  styleUrls: ['./view-drivers.component.css']
})
export class ViewDriversComponent implements OnInit {

  request_type;

  getData;
  getData2;
  searchValue: string = "";
  api_base_url = environment.api_base_url;

  constructor(private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }


    // Get url parameters
    this.activatedRoute.queryParams.subscribe(params => {

      let requestType = params['request'];

      if (requestType) {

        this.request_type = requestType;

      }

    });

  }

  ngOnInit(): void {

    this.getApiData().subscribe(data => {
      this.getData = data;
      this.getData2 = data;
    });

  }


  // Get data from api
  getApiData() {

    let apiUrl = "";

    if (this.request_type == "all") {
      apiUrl = this.api_base_url + 'driver/';
    } else if (this.request_type == "assign") {
      apiUrl = this.api_base_url + 'driver/assign';
    } else if (this.request_type == "vacant") {
      apiUrl = this.api_base_url + 'driver/vacant';
    }
    return this.http.get(apiUrl);

  }

  search(value) {

    if (value != "") {
      this.getData = []

      for (let i = 0; i < this.getData2.length; i++) {

        if ((this.getData2[i].first_name).toLowerCase().includes(value) || (this.getData2[i].email).toLowerCase().includes(value) ||
          (this.getData2[i].last_name).toLowerCase().includes(value) || (this.getData2[i].nic).toLowerCase().includes(value)) {

          this.getData.push(this.getData2[i]);

        }
      }

    } else {

      this.getData = this.getData2;

    }

  }

}
