import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  psw: string = "";

  getResponse;
  api_base_url = environment.api_base_url;

  loginPostApiUrl = this.api_base_url + 'admin/login';

  constructor(
    private router: Router,
    private http: HttpClient) {

    if (localStorage.getItem('id') != null) {
      this.router.navigate(['/admin/home']);
    }

  }

  ngOnInit(): void { }

  adminLogin() {

    if (this.email == '' || this.psw == '') {
      this.warningMsg('Fields are empty!');

    } else {

      var data = {
        email: this.email,
        psw: this.psw
      }

      this.http.post<any>(this.loginPostApiUrl, data).subscribe(data => {
        this.getResponse = data;

        if (this.getResponse.status == "success") {
          this.email = "";
          this.psw = "";
          var admin_id = this.getResponse.details[0].id;
          var admin_name = this.getResponse.details[0].name;
          var admin_email = this.getResponse.details[0].email;
          // this.successMsg(this.getResponse.msg)

          localStorage.setItem("id", admin_id);
          localStorage.setItem("name", admin_name);
          localStorage.setItem("email", admin_email);

          this.router.navigate(['/admin/home']);

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