import { Component, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.model';
import { ModalController } from '@ionic/angular';
import { DogProfilePage } from '../dog-profile/dog-profile.page';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-active-submissions',
  templateUrl: './active-submissions.page.html',
  styleUrls: ['./active-submissions.page.scss'],
})
export class ActiveSubmissionsPage implements OnInit {
  
  user: any;
  actives: Dog[] = [];

  constructor(private modalCtrl: ModalController,
    private userService: UserService,
    private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.user$.subscribe((user) => {
      this.user = user
      this.getActives()
    })
  }

  getActives() {
    this.actives = this.userService.getActives(this.user)
  }

  async openModalDogProfile(dog: string) {
    const modal = await this.modalCtrl.create({
    component: DogProfilePage,
    componentProps: {
    dID: dog
    }
    });
    return await modal.present();
  }
}
