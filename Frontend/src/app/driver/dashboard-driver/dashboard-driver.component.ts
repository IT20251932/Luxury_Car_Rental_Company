import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard-driver',
  templateUrl: './dashboard-driver.component.html',
  styleUrls: ['./dashboard-driver.component.css']
})
export class DashboardDriverComponent implements OnInit {

  driversCount: string = "10";
  assignDrivers: string = "10";
  vacantDrivers: string = "10";

  api_base_url = environment.api_base_url;

  constructor(
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.getDriversCount().subscribe(data => {
      this.driversCount = data[0]['count'];
    });

    this.getAssignedDriversCount().subscribe(data => {
      this.assignDrivers = data[0]['count'];
    });

    this.getVacantDriversCount().subscribe(data => {
      this.vacantDrivers = data[0]['count'];
    });

  }

  getParagraphEvent(event) {
    var statev = event.target.textContent
    statev = this.driversCount;
  }

  // Get data from api
  getDriversCount() {

    let apiUrl = this.api_base_url + 'driver/count';
    return this.http.get(apiUrl);

  }

  getAssignedDriversCount() {

    let apiUrl = this.api_base_url + 'driver/count/assigned';
    return this.http.get(apiUrl);

  }

  getVacantDriversCount() {

    let apiUrl = this.api_base_url + 'driver/count/vacant';
    return this.http.get(apiUrl);

  }

  getReportData() {

    let apiUrl = this.api_base_url + 'report/drivers_report';
    return this.http.get(apiUrl, { responseType: 'blob' });

  }

  generateReport() {

    this.getReportData().subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      let pdfUrl = window.URL.createObjectURL(blob);

      var PDF_link = document.createElement('a');
      PDF_link.href = pdfUrl;
      window.open(pdfUrl, '_blank');
      PDF_link.download = "drivers_report.pdf";
      PDF_link.click();
    });
  }


  // logout
  logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    this.router.navigate(['/login']);
  }

}
