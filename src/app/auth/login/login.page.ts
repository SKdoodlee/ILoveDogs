import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  logInForm: FormGroup;
  loadingIndicator;
  loading = false;
  public showPassword: boolean = false;


  constructor(private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  async ngOnInit() {
    this.initForm();

    const navigationId = this.router.getCurrentNavigation().id;
    if (navigationId === 1) {
      await this.presentLoading('Carregando...');
      this.authService.user$.pipe(take(1)).subscribe((user) => {
        setTimeout(() => {
          this.dismissLoading();
        }, 200);
        if (user) {
          this.navCtrl.navigateRoot(['tabs/feed']);
        }
      });
    }
  }

  initForm() {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  async onSubmit(): Promise<void> {
    await this.presentLoading('Autenticando');

    if (this.logInForm.valid) {
      console.log(this.logInForm.value);

      const email = this.logInForm.controls.email.value;
      const password = this.logInForm.controls.password.value;

      this.authService.login(email, password).then(() => {
        this.dismissLoading();
        this.navCtrl.navigateRoot(['tabs/feed']);
      }).catch((error) => {
        this.dismissLoading();
        this.presentAlert('Algo deu errado', error.message);
      });

    } else {
      this.dismissLoading();
      this.presentAlert('Algo deu errado', 'Escreva o e-mail e a senha, por favor.');
    }
  }

  goToSignUp(): void {
    this.navCtrl.navigateForward(['auth/sign-up']);
  }

  async presentLoading(body: string) {
    this.loadingIndicator = await this.loadingCtrl.create({
      message: body
    });
    this.loading = true;
    await this.loadingIndicator.present();
  }

  async dismissLoading() {
    this.loading = false;
    await this.loadingIndicator.dismiss();
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Pronto']
    });

    await alert.present();
  }

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  public forgotPassword (){
    this.navCtrl.navigateForward(['auth/forgot']);
  }
}
