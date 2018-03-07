import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

    public contractAddresses: Observable<any>;

    private contractAddressCollection: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore) {
        this.contractAddressCollection = afs.collection<any>('contracts');
        this.contractAddresses = this.contractAddressCollection.valueChanges();
    }

    getContractAddress(billNum: string) {
        var contractRef = this.afs.collection('contracts');
        var query = contractRef.ref.where('billNumber', '==', billNum).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.exists) {
                        return contractRef.valueChanges();
                    } else {
                        throw new Error(`A contract doesnt exist for bill number ${billNum}`);
                    }
                })
            }).catch(err => {
                throw err;
            });
        return contractRef.valueChanges();
    }

}