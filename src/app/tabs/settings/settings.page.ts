import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    await this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  gotoEditProfile() {
    this.navCtrl.navigateForward(['tabs', 'settings', 'editprofile', this.user.id]);
  }

  gotoSeeProfile() {
    this.navCtrl.navigateForward(['tabs', 'settings', 'seeprofile', this.user.id]);
  }

  gotoChangePass() {
    this.navCtrl.navigateForward(['tabs', 'settings', 'changepass', this.user.id]);
  }

  gotoLogout() {
    this.navCtrl.navigateForward(['tabs', 'settings', 'logout', this.user.id]);
  }

  gotoDelete() {
    this.navCtrl.navigateForward(['tabs', 'settings', 'delete', this.user.id]);
  }

}
