import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-inquires',
  templateUrl: './view-inquires.component.html',
  styleUrls: ['./view-inquires.component.css']
})
export class ViewInquiresComponent implements OnInit {

  getData;
  getData2;
  searchValue: string = "";

  api_base_url = environment.api_base_url;

  constructor(private http: HttpClient,
    private router: Router) {

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

    let apiUrl = this.api_base_url + 'inquiry/';
    return this.http.get(apiUrl);

  }

  search(value) {

    if (value != "") {
      this.getData = []



      for (let i = 0; i < this.getData2.length; i++) {

        if ((this.getData2[i].full_name).toLowerCase().includes(value) || (this.getData2[i].contact_no).toLowerCase().includes(value)
          || (this.getData2[i].email).toLowerCase().includes(value)) {

          this.getData.push(this.getData2[i]);

        }
      }

    } else {

      this.getData = this.getData2;

    }

  }

}
