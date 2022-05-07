import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.css']
})
export class UserSignInComponent implements OnInit {

  lemail: string = "";
  lpsw: string = "";

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


  userSignIn() {

    if (this.lemail == '' || this.lpsw == '') {
      this.warningMsg('Fields are empty!');

    } else {

      var data = {
        "email": this.lemail,
        "psw": this.lpsw
      }

      let login_api = this.api_base_url + "user/login"
      this.http.post<any>(login_api, data).subscribe(data => {
        let getResponse = data;

        if (getResponse.status == "success") {
          this.lemail = "";
          this.lpsw = "";

          localStorage.setItem("useremail", getResponse.details[0].email);

          this.router.navigate(['/index']);

          this.successMsg(getResponse.msg)
        } else {
          this.warningMsg(getResponse.msg)
        }

      })


    }

  }

  // userRegister() {

  //   if (this.rname == '' || this.remail == '' || this.rnumber == '' || this.rpsw == '') {
  //     this.warningMsg('Fields are empty!');

  //   } else if (this.rnumber.length != 10) {
  //     this.warningMsg('Mobile number not valid!');

  //   } else {

  //     const formData = new FormData();
  //     formData.append("name", this.rname);
  //     formData.append("email", this.remail);
  //     formData.append("number", this.rnumber);
  //     formData.append("psw", this.rpsw);

  //     let reg_api = this.api_base_url + "user"
  //     this.http.post<any>(reg_api, formData).subscribe(data => {
  //       let getResponse = data;

  //       if (getResponse.status == "success") {
  //         this.rname = "";
  //         this.remail = "";
  //         this.rnumber = "";
  //         this.rpsw = "";

  //         this.successMsg(getResponse.msg)
  //       } else {
  //         this.warningMsg(getResponse.msg)
  //       }

  //     })


  //   }

  // }

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
