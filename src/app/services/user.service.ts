import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { firestore } from 'firebase';
import { DogService } from './dog.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore,
              private afStorage: AngularFireStorage,
              private dogService: DogService) { }


  createUser(user: any) {
    return this.afs.doc(`users/${user.id}`).set(user);
  }

  getUser(uid: string) {
    return this.afs.doc(`users/${uid}`).valueChanges();
  }

  createUsername(user: any) {
    const doc = {
      username: user.username,
      uid: user.id
    };
    return this.afs.doc(`usernames/${user.username}`).set(doc);
  }

  searchUsers(username: string) {
    return this.afs.collection('users', ref => ref
      .where('username', '>=', username)
      .where('username', '<=', username + '\uf8ff')
      .limit(10)
      .orderBy('username'))
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
      );
  }

  async usernameExists(username: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await this.afs.doc(`usernames/${username}`).get().toPromise().then((doc) => doc.exists);

      if (user) {
        reject(new Error('Nome já existente '));
      } else {
        resolve(true);
      }
    });
  }

  deleteUser(userId: string) {
    return this.afs.doc(`users/${userId}`).delete();
  }

  deleteUsername(username: string) {
    return this.afs.doc(`usernames/${username}`).delete();
  }

  updateUser(userId: string, updatedUser: any) {
    return this.afs.doc(`users/${userId}`).update(updatedUser);
  }

  async uploadProfilePicture(uid: string, image: File) {
    return new Promise(async (resolve, reject) => {
      try {
        const filePath = `profilePictures/${uid}.jpeg`;
        const task = this.afStorage.upload(filePath, image);
        await task.snapshotChanges().toPromise();
        const pictureUrl = await this.afStorage.ref(filePath).getDownloadURL().toPromise();
        console.log(pictureUrl);
        await this.updateUser(uid, { pictureUrl });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  async removeProfilePicture(uid: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const filePath = `profilePictures/${uid}.jpeg`;
        const task = this.afStorage.ref(filePath).delete();
        await task.toPromise();
        await this.updateUser(uid, { pictureUrl: null });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  favDog(user: any, did: string) {
    return this.afs.firestore.runTransaction(async transaction => {
      const userRef = this.afs.doc(`users/${user.id}`).ref;
      const favDog = firestore.FieldValue.arrayUnion(did);

      transaction.update(userRef, { favourites: favDog });
    });
  }

  unfavDog(user: any, did: string) {
    return this.afs.firestore.runTransaction(async transaction => {
      const userRef = this.afs.doc(`users/${user.id}`).ref;
      const unfavDog = firestore.FieldValue.arrayRemove(did);

      transaction.update(userRef, { favourites: unfavDog });
    });
  }

  
  actDog(user: any, did: string) {
    return this.afs.firestore.runTransaction(async transaction => {
      const userRef = this.afs.doc(`users/${user.id}`).ref;
      const actDog = firestore.FieldValue.arrayUnion(did);

      transaction.update(userRef, { actives: actDog });
    });
  }

  deactDog(user: any, did: string) {
    return this.afs.firestore.runTransaction(async transaction => {
      const userRef = this.afs.doc(`users/${user.id}`).ref;
      const deactDog = firestore.FieldValue.arrayRemove(did);

      transaction.update(userRef, { actives: deactDog });
    });
  }

  getActives(user: any) {
    const actDogs: any[] = [];
    user.actives.forEach(actDog => {
      this.dogService.getDog(actDog).subscribe((dog: any) => {
        if (dog !== undefined) {
          actDogs.push(dog);
        } else {
          user.favourites.splice(user.favourites.indexOf(actDog), 1);
          this.updateUser(user.id, { favourites: user.favourites });
        }
      });
    });
    return actDogs;
  }
}
