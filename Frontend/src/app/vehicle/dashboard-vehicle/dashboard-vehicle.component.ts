import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-vehicle',
  templateUrl: './dashboard-vehicle.component.html',
  styleUrls: ['./dashboard-vehicle.component.css']
})
export class DashboardVehicleComponent implements OnInit {

  vehiclesCount: string = "0";
  vacantCount: string = "0";

  api_base_url = environment.api_base_url;

  constructor(
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.getVehiclesCount().subscribe(data => {
      this.vehiclesCount = data[0]['count'];
    });

    this.getVacantVehiclesCount().subscribe(data => {
      this.vacantCount = data[0]['count'];
    });

  }

  getParagraphEvent(event) {
    var statev = event.target.textContent
    statev = "";
  }

  // Get data from api
  getVehiclesCount() {

    let apiUrl = this.api_base_url + 'vehicle/count';
    return this.http.get(apiUrl);

  }

  getVacantVehiclesCount() {

    let apiUrl = this.api_base_url + 'vehicle/count/vacant';
    return this.http.get(apiUrl);

  }

  getReportData() {

    let apiUrl = this.api_base_url + 'report/vehicles_report';
    return this.http.get(apiUrl, { responseType: 'blob' });

  }

  generateReport() {

    this.getReportData().subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      let pdfUrl = window.URL.createObjectURL(blob);

      var PDF_link = document.createElement('a');
      PDF_link.href = pdfUrl;
      window.open(pdfUrl, '_blank');
      PDF_link.download = "vehicles_report.pdf";
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
