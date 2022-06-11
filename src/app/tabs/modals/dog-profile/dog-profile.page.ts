import { Component, OnInit, Input } from '@angular/core';
import { DogService } from 'src/app/services/dog.service';
import { AlertController, NavController, ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EditDogPage } from '../edit-dog/edit-dog.page';
import { ContactDogpoundPage } from '../contact-dogpound/contact-dogpound.page';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DogAdopteesPage } from '../dog-adoptees/dog-adoptees.page';

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.page.html',
  styleUrls: ['./dog-profile.page.scss'],
})
export class DogProfilePage implements OnInit {


  @Input() dID: string;

  dog: any;
  detail: any[];
  user: any;
  dogId: string;
  userId: string;

  constructor(private dogService: DogService,
              private authService: AuthService,
              private userService: UserService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private activatedRouter: ActivatedRoute,
              private modalCtrl: ModalController,
              private navParams: NavParams) { }

  ngOnInit() {
    this.getDog(this.dID);
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  deleteDog(dogId: string) {
    this.removePicture();
    this.dogService
      .deleteDog(dogId)
      .then(() => {
        console.log(dogId);
        this.presentAlertConfirm('Sucesso', 'Perfil excluido');
      })
      .catch((error) => {
        this.presentAlert('Algo deu errado', error.message);
      });
  }

  removePicture(): Promise<boolean> {

    this.dogService.removeProfilePicture(this.dog.id.toString()).then(() => {
      console.log('Excluido com suesso');
    }).catch((error) => {
      console.log('Error');
    });
    return;
  }

  getDog(dogId: string) {
    this.dogService.getDog(dogId).subscribe((dogprofile: any) => {
      if (!dogprofile) {
        this.navCtrl.navigateRoot(['tabs/feed']);
      }
      this.dog = dogprofile;
    });
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

  async openModalEdit(dog: string) {
    const modal = await this.modalCtrl.create({
      component: EditDogPage,
      componentProps: {
        dID: dog
      }
    });
    return await modal.present();
  }

  async openModalContact(dog: string) {
    const modal = await this.modalCtrl.create({
      component: ContactDogpoundPage,
      componentProps: {
        dID: dog
      }
    });
    return await modal.present();
  }

  async openModalAdoptees(dog: string) {
    const modal = await this.modalCtrl.create({
      component: DogAdopteesPage,
      componentProps: {
        dID: dog
      }
    });
    return await modal.present();
  }

  async goBack() {
    await this.modalCtrl.dismiss();
  }

  toggleLike() {
    if (this.user.favourites.includes(this.dog.id)) {
      this.user.favourites = this.user.favourites.filter((id: string) => id !== this.dog.id);

      this.userService.unfavDog(this.user, this.dog.id).then(() => {
        console.log('disliked');
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.user.favourites.push(this.dog.id);

      this.userService.favDog(this.user, this.dog.id).then(() => {
        console.log('liked');
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}


