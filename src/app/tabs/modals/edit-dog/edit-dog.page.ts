import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dog } from 'src/models/dog.model';
import { ModalController, AlertController, NavParams, LoadingController, ActionSheetController } from '@ionic/angular';
import { DogService } from 'src/app/services/dog.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.page.html',
  styleUrls: ['./edit-dog.page.scss'],
})
export class EditDogPage implements OnInit {

  @Input() dID: string;

  editDogForm: FormGroup;
  dog: Dog;
  loadingIndicator;
  loading = false;

  dogProfile: any;
  displayPhoto: any;
  file: any;


  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private dogService: DogService,
    private sanitizer: DomSanitizer,
    private actionSheetCtrl: ActionSheetController,
    private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.initForm();
    const dID = this.navParams.get('dID');
    this.getDog(dID);
    this.initForm();
  }

  getDog(dId: string) {
    this.dogService.getDog(dId).subscribe((dog) => {
      this.dog = dog as Dog;
      this.displayPhoto = this.dog.profilepic;
      this.patchForm();
    });
  }

  async updateDog() {
    await this.presentLoading('Alterando...');
    //console.log(this.editDogForm);
    if (this.editDogForm.valid) {
      const updatedDog = {
        adoptStatus: this.dog.adoptStatus,
        adoptees: this.dog.adoptees,
        idDogPound: this.dog.idDogPound,
        ...this.editDogForm.value
      };
      console.log(updatedDog);
      try {
        await this.dogService.updateDog(this.dog.id.toString(), updatedDog, this.file);
        this.dismissLoading();
        this.presentAlertConfirm('Sucesso', 'Perfil modificado');
        this.closeModal();
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
    this.editDogForm.patchValue({
      name: this.dog.name,
      sex: this.dog.sex,
      size: this.dog.size,
      breed: this.dog.breed,
      age: this.dog.age,
      coat: this.dog.coat,
      fplace: this.dog.fplace,
      found: this.dog.found,
      behaviourSenior: this.dog.behaviourSenior,
      behaviourKids: this.dog.behaviourKids,
      behaviourDogs: this.dog.behaviourDogs,
      behaviourCats: this.dog.behaviourCats,
      color: this.dog.color,
      description: this.dog.description,
      collar: this.dog.collar,
      status: this.dog.status,
      profilepic: this.dog.profilepic
    });
  }

  initForm() {
    this.editDogForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      breed: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      coat: new FormControl(null, [Validators.required]),
      fplace: new FormControl(null, [Validators.required]),
      found: new FormControl(null, [Validators.required]),
      behaviourSenior: new FormControl(null, [Validators.required]),
      behaviourKids: new FormControl(null, [Validators.required]),
      behaviourDogs: new FormControl(null, [Validators.required]),
      behaviourCats: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      description: new FormControl(null, ),
      collar: new FormControl(null, ),
      status: new FormControl(null, [Validators.required]),
      profilepic: new FormControl(null)
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
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

  async takePicture(source: CameraSource): Promise<boolean> {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    });
    const base64 = `data:image/${image.format};base64, ${image.base64String}`;
    this.displayPhoto = this.sanitizer.bypassSecurityTrustResourceUrl(base64);
   
    const imageBlob = this.base64toBlob(image.base64String);
    this.file = new File([imageBlob], 'test.jpeg', { type: 'image/jpeg' });
    this.editDogForm.get('profilepic').setValue('Foto Tomada!');
    this.editDogForm.get('profilepic').updateValueAndValidity();
   
    return;
  }

  base64toBlob(dataURI: string) {
  
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });

    return blob;
  }

  resetView(): void {
    this.file = undefined;
    this.displayPhoto = undefined;
  }

  async removePicture(): Promise<boolean> {
    await this.presentLoading('Removendo a foto');
   
    if (this.dog.profilepic) {

      this.dogService.removeProfilePicture(this.dog.id.toString()).then(() => {
    
        this.dismissLoading();
        this.presentAlert('Sucesso!', 'Foto removida');
    
      }).catch((error) => {
        this.dismissLoading();
        this.presentAlert('Erro', error.message);
        
      });
    } else {
      this.dismissLoading();
      this.presentAlert('Erro', `Não tem foto`);
      
    }

    return;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Alterar foto',
      buttons: [
        {
          text: 'Remover foto',
          handler: () => this.removePicture()
        },
        {
          text: 'Tirar foto',
          handler: () => this.takePicture(CameraSource.Camera)
        },
        {
          text: 'Galeria',
          handler: () => this.takePicture(CameraSource.Photos)
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
}
