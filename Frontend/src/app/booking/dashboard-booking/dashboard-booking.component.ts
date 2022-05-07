import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-booking',
  templateUrl: './dashboard-booking.component.html',
  styleUrls: ['./dashboard-booking.component.css']
})
export class DashboardBookingComponent implements OnInit {

  getData;
  api_base_url = environment.api_base_url;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  getReportData() {

    let apiUrl = this.api_base_url + 'report/bookings_report';
    return this.http.get(apiUrl, { responseType: 'blob' });

  }

  generateReport() {

    this.getReportData().subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      let pdfUrl = window.URL.createObjectURL(blob);

      var PDF_link = document.createElement('a');
      PDF_link.href = pdfUrl;
      window.open(pdfUrl, '_blank');
      PDF_link.download = "bookings_report.pdf";
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
