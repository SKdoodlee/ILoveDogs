import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-credentials',
  templateUrl: './edit-credentials.page.html',
  styleUrls: ['./edit-credentials.page.scss'],
})
export class EditCredentialsPage implements OnInit {

  editUserForm: FormGroup;
  user: User;
  loadingIndicator;
  loading = false;
  public showCurrentPassword: boolean = false;
  public showPassword: boolean = false;
  public showConfirmedPassword: boolean = false;

  constructor(private modalCtrl: ModalController,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private userService: UserService) { }

  async ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.patchForm();
    });
    this.initForm();
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
    await this.presentLoading('Alerando...');
    if (this.editUserForm.valid) {
      if (this.editUserForm.controls.email.value === this.user.email) {

        this.dismissLoading();
        this.presentAlert('Erro', 'E-mail existente. Tente novamente.');
      } else {
        const updatedUser = {
          email: this.editUserForm.controls.email.value
        };

        await this.authService.reauthenticate(this.editUserForm.controls.cPassword.value).then(() => {

          this.userService.updateUser(this.user.id.toString(), updatedUser);
          this.authService.changeEmail(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.email.value);
          this.dismissLoading();
          this.presentAlertConfirm('Sucesso', 'E-mail alterado');
          this.closeModal();
        }).catch((error) => {
          this.dismissLoading();
          this.presentAlert('Erro', 'Sua senha não está correta');
        });
      }
    } else {
      this.dismissLoading();
      this.presentAlert('Erro', 'Sua senha não está correta');
    }
  }

  async updatePassword() {
    await this.presentLoading('Fazendo alterações');
    if (this.editUserForm.valid) {
      await this.authService.reauthenticate(this.editUserForm.controls.cPassword.value).then(() => {
  
       if (this.editUserForm.controls.nPassword.value !== this.editUserForm.controls.ncPassword.value) {
          this.dismissLoading();
          this.presentAlert('Erro', 'As senhas não coincidem');

        } else if (this.editUserForm.controls.nPassword.value == null) {
          this.dismissLoading();
          this.presentAlert('Erro', 'Coloque uma nova senha ');

        } else if (this.editUserForm.controls.nPassword.value.length < 6) {
          this.dismissLoading();
          this.presentAlert('Erro', 'A senha tem que ter no minimo 6 caracteres');
        } else {
          try {
            console.log(this.editUserForm.controls.email.value);
            if (this.editUserForm.controls.email.value === this.user.email) {
              this.authService.changePassword(this.editUserForm.controls.cPassword.value, this.editUserForm.controls.nPassword.value);
              this.dismissLoading();
              this.presentAlertConfirm('Sucesso','Senha alterada com sucesso');
              this.closeModal();
            } 
          } catch (error) {
            console.log('Tente novamente mais tarde');
            this.dismissLoading();
            this.presentAlert('Sentimos muito', 'Ocorreu um erro, tente novamente');
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
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  public onCurrentPasswordToggle(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
  public onConfirmPasswordToggle(): void {
    this.showConfirmedPassword = ! this.showConfirmedPassword;
  }
  
}
