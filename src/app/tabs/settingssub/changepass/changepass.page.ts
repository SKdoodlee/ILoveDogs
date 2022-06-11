import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.page.html',
  styleUrls: ['./changepass.page.scss'],
})
export class ChangepassPage implements OnInit {

  editUserForm: FormGroup;
  user: any;
  userId: string;

  loadingIndicator;
  loading = false;

  public showCurrentPassword: boolean = false;
  public showPassword: boolean = false;
  public showConfirmedPassword: boolean = false;

  constructor(private modalCtrl: ModalController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private userService: UserService,
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

  patchForm() {
    this.editUserForm.patchValue({
      email: this.user.email
    });
  }

  initForm() {
    this.editUserForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      cPassword: new FormControl(null, [Validators.required]),
      nPassword: new FormControl(null),
      ncPassword: new FormControl(null)
    });
  }

  async updateEmail() {
    await this.presentLoading('Alterando...');
    if (this.editUserForm.valid) {
      if (this.editUserForm.controls.email.value === this.user.email) {

        this.dismissLoading();
        this.presentAlert('Erro', 'E-mail existente, tente novamente');
      } else {
        const updatedUser = {
          email: this.editUserForm.controls.email.value
        };

        await this.authService.reauthenticate(this.editUserForm.controls.cPassword.value).then(() => {

          this.userService.updateUser(this.user.uid.toString(), updatedUser);
          this.authService.changeEmail(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.email.value);
          this.dismissLoading();
          this.presentAlertConfirm('Sucesso', 'Alterado com sucesso');
          this.goBack();
        }).catch((error) => {
          this.dismissLoading();
          this.presentAlert('Erro', 'Senha incorreta');
        });
      }
    } else {
      this.dismissLoading();
      this.presentAlert('Erro', 'Senha incorreta');
    }
  }

  async updatePassword() {
    await this.presentLoading('Alterando...');
    if (this.editUserForm.valid) {
      await this.authService.reauthenticate(this.editUserForm.controls.cPassword.value).then(() => {
        if (this.editUserForm.controls.nPassword.value !== this.editUserForm.controls.ncPassword.value) {
          this.dismissLoading();
          this.presentAlert('Erro', 'As senhas não coincidem');

        } else if (this.editUserForm.controls.nPassword.value == null) {
          this.dismissLoading();
          this.presentAlert('Erro', 'Digite uma nova senha ');

        } else if (this.editUserForm.controls.nPassword.value.length < 6) {
          this.dismissLoading();
          this.presentAlert('Erro', 'Senha deve conter pelo menos 6 caracteres');
        } else {
          try {
            console.log(this.editUserForm.controls.email.value);
            if (this.editUserForm.controls.email.value === this.user.email) {
              this.authService.changePassword(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.nPassword.value);
              this.dismissLoading();
              this.presentAlertConfirm('Sucesso', 'Senha alterada');
              this.goBack();
            }
          } catch (error) {
            console.log('Tente novamente');
            this.dismissLoading();
            this.presentAlert('Sinto muito', 'Algo deu errado, tente novamente');
          }
        }
      }).catch((error) => {
        console.log(error);
        this.dismissLoading();
        this.presentAlert('Erro', 'Senha incorreta');
      });
    } else {
      this.dismissLoading();
      this.presentAlert('Erro', 'Senha incorreta');
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

  public onCurrentPasswordToggle(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
  public onConfirmPasswordToggle(): void {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }
  goToFeed() {
    this.navCtrl.navigateRoot(['tabs/feed']);
  }

}
