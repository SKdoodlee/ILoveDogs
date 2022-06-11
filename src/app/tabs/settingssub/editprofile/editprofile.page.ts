import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user.model';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  editUserForms: FormGroup;
  user: any;
  userId: string;

  loadingIndicator;
  loading = false;

  constructor(private alertCtrl: AlertController,
    private authService: AuthService,
    private userService: UserService,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.getUser(this.userId);
    this.initForm();
  }

  getUser(uID: string) {
    this.userService.getUser(uID).subscribe((user) => {
      this.user = user as User;
      this.patchForm();
    })
  }

  async updateUser() {
    await this.presentLoading('Criando Conta');
    if (this.editUserForms.valid) {
      const updatedUser = {
        email: this.user.email,
        ...this.editUserForms.value
      };

      try {
        await this.userService.updateUser(this.user.id.toString(), updatedUser)
        this.dismissLoading();
        this.presentAlertConfirm('Sucesso', 'Alterado com sucesso');
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Algo deu errado', error.message);
      }
    } else {
      this.dismissLoading();
      this.presentAlert('Algo deu errado', 'Preencha os campos corretamente');
    }
  }

  patchForm() {
    this.editUserForms.patchValue({
      nameDogPound: this.user.nameDogPound,
      address: this.user.address,
      phone: this.user.phone
    })
  }

  initForm() {
    this.editUserForms = new FormGroup({
      nameDogPound: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
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
            this.goBack();
          }
        }
      ]
    });

    await alert.present();
  }

  goBack() {
    this.navCtrl.navigateRoot(['tabs/settings']);
  }

  goToFeed() {
    this.navCtrl.navigateRoot(['tabs/feed']);
  }

}
