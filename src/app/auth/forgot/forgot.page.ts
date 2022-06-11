import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  loadingIndicator;
  loading = false;
  public email: string = "";

  constructor(private afa: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async sendLink(): Promise<void> {
    await this.presentLoading('Processando')

    if (this.email != "") {
      try {
        await this.afa.resetPassword(this.email);
        this.dismissLoading();
        this.presentAlertConfirm('E-mail enviado', 'Foi enviado com sucesso');
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Usuário não registrado', 'O usuário não se encontra registrado');
      }

    }
    else {
      this.dismissLoading();
      this.presentAlert('Informação incompleta', 'Por favor, preencha corretamente.');



    }
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

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Pronto',
          handler: () => {
            this.navCtrl.navigateRoot(['']);
          }
        }
      ]
    });

    await alert.present();
  }
  goToSignUp(): void {
    this.navCtrl.navigateForward(['auth/sign-up']);
  }

}
