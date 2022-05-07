import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { ViewDriversComponent } from './driver/view-drivers/view-drivers.component';
import { ViewDriverDetailsComponent } from './driver/view-driver-details/view-driver-details.component';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddBookingComponent } from './booking/add-booking/add-booking.component';
import { ViewBookingsComponent } from './booking/view-bookings/view-bookings.component';
import { ViewBookingDetailsComponent } from './booking/view-booking-details/view-booking-details.component';
import { AddInquiryComponent } from './Inquiry/add-inquiry/add-inquiry.component';
import { ViewInquiryDetailsComponent } from './Inquiry/view-inquiry-details/view-inquiry-details.component';
import { ViewInquiresComponent } from './Inquiry/view-inquires/view-inquires.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { ViewVehiclesComponent } from './vehicle/view-vehicles/view-vehicles.component';
import { ViewVehicleDetailsComponent } from './vehicle/view-vehicle-details/view-vehicle-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardBookingComponent } from './booking/dashboard-booking/dashboard-booking.component';
import { DashboardDriverComponent } from './driver/dashboard-driver/dashboard-driver.component';
import { DashboardVehicleComponent } from './vehicle/dashboard-vehicle/dashboard-vehicle.component';
import { AdminAddInquiryComponent } from './Inquiry/admin-add-inquiry/admin-add-inquiry.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDriverComponent,
    ViewDriversComponent,
    ViewDriverDetailsComponent,
    LoginComponent,
    AdminHomeComponent,
    AddBookingComponent,
    ViewBookingsComponent,
    ViewBookingDetailsComponent,
    AddInquiryComponent,
    ViewInquiryDetailsComponent,
    ViewInquiresComponent,
    AddVehicleComponent,
    ViewVehiclesComponent,
    ViewVehicleDetailsComponent,
    DashboardComponent,
    DashboardBookingComponent,
    DashboardDriverComponent,
    DashboardVehicleComponent,
    AdminAddInquiryComponent,
    UserSignInComponent,
    UserSignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
