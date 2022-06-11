import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { DogService } from 'src/app/services/dog.service';
import { UserService } from 'src/app/services/user.service';
import { Dog } from 'src/models/dog.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-dog-adoptees',
  templateUrl: './dog-adoptees.page.html',
  styleUrls: ['./dog-adoptees.page.scss'],
})
export class DogAdopteesPage implements OnInit {

  @Input() dID: string;

  dog: any;
  Adoptees: any[];
  Users: any[];

  constructor(private modalCtrl: ModalController,
              private dogService: DogService,
              private navCtrl: NavController,
              private navParams: NavParams,
              private userService: UserService) { }

  ngOnInit() {
    this.getDog(this.dID);
  }

  getDog(dogId: string) {
    this.dogService.getDog(dogId).subscribe((dogprofile: any) => {
      if (!dogprofile) {
        this.navCtrl.navigateRoot(['tabs/feed']);
      }
      this.dog = dogprofile;
      this.Adoptees = this.dog.adoptees;
      console.log(this.Adoptees);
      
    });
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
