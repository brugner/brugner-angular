import { AuthService } from './../services/auth.service';
import { Component, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('navigationToggle') navigationToggle: any;

  isMenuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isMenuOpen = false;
      }
    });
  }

  onNavigationClick(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any): void {
    console.log(event.target);

    if (!this.navigationToggle.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
}
