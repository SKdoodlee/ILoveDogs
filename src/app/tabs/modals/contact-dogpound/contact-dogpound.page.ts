import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-dogpound',
  templateUrl: './contact-dogpound.page.html',
  styleUrls: ['./contact-dogpound.page.scss'],
})
export class ContactDogpoundPage implements OnInit {

  @Input() dID: string;

  user: any;

  loadingIndicator;
  loading = false;

  constructor(private modalCtrl: ModalController,
              private authService: AuthService,
              private userService: UserService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user
    })
  }

  async toggleActive() {
    if (this.user.actives.includes(this.dID)) {
      await this.presentLoading('Enviando solicitação');
      this.user.actives = this.user.actives.filter((id: string) => id !== this.dID)

      this.userService.deactDog(this.user, this.dID).then(() => {
        this.dismissLoading();
        this.presentAlertConfirm('Sucesso', 'Seu pedido de adoção foi cancelado com sucesso!');
      }).catch((error) => {
        this.dismissLoading();
        this.presentAlert('Algo deu errado', error.message);
      })
    } else {
      await this.presentLoading('Enviando solicitação');
      this.user.favourites.push(this.dID);

      this.userService.actDog(this.user, this.dID).then(() => {
        this.dismissLoading();
        this.presentAlertConfirm('Sucesso', 'Tua solicitação foi enviado com sucesso');
      }).catch((error) => {
        this.dismissLoading();
        this.presentAlert('Algo deu errado', error.message);
      })
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
            this.closeModalContact();
          }
        }
      ]
    });

    await alert.present();
  }

  async closeModalContact() {
    await this.modalCtrl.dismiss();
  }
}
