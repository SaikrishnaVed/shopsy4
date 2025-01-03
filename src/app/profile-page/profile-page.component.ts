import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service'; // Update the path as per your project structure
import { DatePipe } from '@angular/common';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { DateFormatPipe } from '../date-format.pipe';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [DatePipe],
})
export class ProfilePageComponent implements OnInit {
  isLoading = false;
  userId = Number(localStorage.getItem('userId'));
  user = {
    Id: this.userId,
    userName: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: ''
  };

  constructor(private appService: AppService, private dateFormatPipe: DatePipe) {}

  ngOnInit(): void {
    this.fetchUserDetails(this.userId);
  }

  fetchUserDetails(userId: number): void {
    this.isLoading = true;
    this.appService.GetUserById(userId).subscribe({
      next: (response) => {
        this.user = response;
        // if (this.user.dateOfBirth) {
        //   const datePipe = new DatePipe('en-US');
        //   this.user.dateOfBirth = datePipe.transform(
        //     this.user.dateOfBirth,
        //     'dd-mm-yy' // Format suitable for input type="date"
        //   );
        // }
        if (this.user.dateOfBirth) {
          this.user.dateOfBirth = this.dateFormatPipe.transform(
            this.user.dateOfBirth,
            'yyyy-MM-dd'
          );
        }
        
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        // this.snackBar.open('Failed to load user details.', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(profileForm: any): void {
    if (profileForm.valid) {
      this.isLoading = true;
      this.appService.UpdateUserDetails(this.user).subscribe({
        next: () => {
          this.isLoading = false;
          // this.snackBar.open('Profile updated successfully.', 'Close', { duration: 3000 });
        },
        error: () => {
          this.isLoading = false;
          // this.snackBar.open('Failed to update profile.', 'Close', { duration: 3000 });
        }
      });
    } else {
      // this.snackBar.open('Please correct the errors in the form.', 'Close', { duration: 3000 });
    }
  }

  resetForm(profileForm: any): void {
    profileForm.resetForm();
    // this.fetchUserDetails(this.userId);
  }
}