import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  rname: string = "";
  remail: string = "";
  rnumber: string = "";
  rpsw: string = "";

  api_base_url = environment.api_base_url;

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    if (localStorage.getItem('useremail') != null) {
      this.router.navigate(['/index']);
    }

  }

  ngOnInit(): void {
  }

  userSignUp() {

    console.log("******** " + this.rname);
    console.log("******** " + this.remail);
    console.log("******** " + this.rnumber);
    console.log("******** " + this.rpsw);

    if (this.rname == '' || this.remail == '' || this.rnumber == '' || this.rpsw == '') {
      this.warningMsg('Fields are empty!');

    } else if (this.isValidEmail(this.remail) != true) {
      this.warningMsg('Your email not valid!');

    } else if (this.rnumber.length != 10) {
      this.warningMsg('Your mobile number not valid!');

    } else {

      let formData = {
        "name": this.rname,
        "email": this.remail,
        "number": this.rnumber,
        "psw": this.rpsw
      }

      let reg_api = this.api_base_url + "user"
      this.http.post<any>(reg_api, formData).subscribe(data => {
        let getResponse = data;

        if (getResponse.status == "success") {
          this.rname = "";
          this.remail = "";
          this.rnumber = "";
          this.rpsw = "";

          this.successMsg(getResponse.msg)
        } else {
          this.warningMsg(getResponse.msg)
        }

      })


    }

  }

  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

