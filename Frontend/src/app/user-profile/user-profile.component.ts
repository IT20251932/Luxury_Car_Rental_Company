import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  rname: string = "";
  remail: string = "";
  rnumber: string = "";

  api_base_url = environment.api_base_url;

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    if (localStorage.getItem('useremail') == null) {
      this.router.navigate(['/index']);
    }

  }

  ngOnInit(): void {

    this.getProfileDetails().subscribe(data => {
      this.rname = data[0].name
      this.rnumber = data[0].number
      this.remail = localStorage.getItem('useremail');
    });

  }

  // Get data from api
  getProfileDetails() {

    let apiUrl = this.api_base_url + 'user/' + localStorage.getItem('useremail');
    return this.http.get(apiUrl);

  }

  updateProfile() {

    if (this.rname == '' || this.rnumber == '') {
      this.warningMsg('Fields are empty!');

    } else if (this.rnumber.length != 10) {
      this.warningMsg('Your mobile number not valid!');

    } else {

      let formData = {
        "name": this.rname,
        "number": this.rnumber
      }

      let reg_api = this.api_base_url + "user/" + localStorage.getItem('useremail')
      this.http.put<any>(reg_api, formData).subscribe(data => {
        let getResponse = data;

        if (getResponse.status == "success") {

          this.successMsg(getResponse.msg)
        } else {
          this.warningMsg(getResponse.msg)
        }

      })


    }

  }

  removeProfile() {

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you won't remove account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove!'
    }).then((result) => {
      if (result.isConfirmed) {

        let apiUrl = this.api_base_url + "user/" + localStorage.getItem('useremail');
        return this.http.delete(apiUrl).subscribe(resData => {

          if (resData['status'].toString() == "success") {

            localStorage.removeItem("useremail");

            this.successMsg(resData['msg'].toString())
            this.router.navigate(['/index']);

          } else {
            this.warningMsg(resData['msg'].toString())
          }

        });

      }
    })

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