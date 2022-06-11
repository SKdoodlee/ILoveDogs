import { Component, Input, OnInit } from '@angular/core';
import { Dog } from 'src/models/dog.model';
import { DogService } from 'src/app/services/dog.service';
import { NavController, ModalController } from '@ionic/angular';
import { DogProfilePage } from '../modals/dog-profile/dog-profile.page';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  @Input() uID: string;

  Dogs: Dog[] = [];

  user: any;

  constructor(private dogService: DogService,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private userService: UserService,
              private authService: AuthService
              ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      
    });
    this.getDogs();
  }

  async getUser(userId: string) {
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user as User;
    });
  }

  getDogs() {
    this.dogService.getDogs().subscribe(dogs => {
      this.Dogs = dogs;
    });
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

  goToDesc(dogId: String) {
    this.navCtrl.navigateForward(['tabs', 'feed', 'dogprofile', dogId])
  }
}
