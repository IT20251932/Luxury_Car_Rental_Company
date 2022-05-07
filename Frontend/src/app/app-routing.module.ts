import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Login
import { LoginComponent } from './login/login.component';

// User
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';

// Admin
import { AdminHomeComponent } from './admin-home/admin-home.component';

// Driver
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { ViewDriversComponent } from './driver/view-drivers/view-drivers.component';
import { ViewDriverDetailsComponent } from './driver/view-driver-details/view-driver-details.component';
import { DashboardDriverComponent } from './driver/dashboard-driver/dashboard-driver.component';

// Vehicle
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { ViewVehiclesComponent } from './vehicle/view-vehicles/view-vehicles.component';
import { ViewVehicleDetailsComponent } from './vehicle/view-vehicle-details/view-vehicle-details.component';
import { DashboardVehicleComponent } from './vehicle/dashboard-vehicle/dashboard-vehicle.component';

// Booking
import { AddBookingComponent } from './booking/add-booking/add-booking.component';
import { ViewBookingsComponent } from './booking/view-bookings/view-bookings.component';
import { ViewBookingDetailsComponent } from './booking/view-booking-details/view-booking-details.component';
import { DashboardBookingComponent } from './booking/dashboard-booking/dashboard-booking.component';

// Inquiry
import { AddInquiryComponent } from './Inquiry/add-inquiry/add-inquiry.component';
import { AdminAddInquiryComponent } from './Inquiry/admin-add-inquiry/admin-add-inquiry.component';
import { ViewInquiresComponent } from './Inquiry/view-inquires/view-inquires.component';
import { ViewInquiryDetailsComponent } from './Inquiry/view-inquiry-details/view-inquiry-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: DashboardComponent },
  { path: 'user-sign-in', component: UserSignInComponent },
  { path: 'user-sign-up', component: UserSignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent }
    ]
  },
  {
    path: 'admin/driver', children: [
      { path: '', redirectTo: '/admin/driver/dashboard-driver', pathMatch: 'full' },
      { path: 'add-driver', component: AddDriverComponent },
      { path: 'view-drivers', component: ViewDriversComponent },
      { path: 'view-driver-details', component: ViewDriverDetailsComponent },
      { path: 'dashboard-driver', component: DashboardDriverComponent }
    ]
  },
  {
    path: 'admin/vehicle', children: [
      { path: '', redirectTo: '/admin/vehicle/dashboard-vehicle', pathMatch: 'full' },
      { path: 'add-vehicle', component: AddVehicleComponent },
      { path: 'view-vehicles', component: ViewVehiclesComponent },
      { path: 'view-vehicle-details', component: ViewVehicleDetailsComponent },
      { path: 'dashboard-vehicle', component: DashboardVehicleComponent }
    ]
  },
  {
    path: 'admin/booking', children: [
      { path: '', redirectTo: '/admin/booking/dashboard-booking', pathMatch: 'full' },
      { path: 'add-booking', component: AddBookingComponent },
      { path: 'view-bookings', component: ViewBookingsComponent },
      { path: 'view-booking-details', component: ViewBookingDetailsComponent },
      { path: 'dashboard-booking', component: DashboardBookingComponent }
    ]
  },
  {
    path: 'admin/inquiry', children: [
      { path: '', redirectTo: '/admin/inquiry/view-inquires', pathMatch: 'full' },
      { path: 'add-inquiry', component: AddInquiryComponent },
      { path: 'admin-add-inquiry', component: AdminAddInquiryComponent },
      { path: 'view-inquires', component: ViewInquiresComponent },
      { path: 'view-inquiry-details', component: ViewInquiryDetailsComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
