import { Injectable} from '@angular/core';
import {Appareil} from '../interfaces/appareil'
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppareilsService {
  private appareilsList: Appareil[] = [
    {
      name: 'machine à laver',
      description: [
        'volume 6 Kg',
        'Temps de lavage 2H',
        'Conso: 173Kwh/an'
      ],
      isOn: true
    },
    {
      name: 'télévision',
      description: [
        'dimension 40pouces',
        'consomation: 22Kwh/an'
      ],
      isOn: false
    },
    {
      name: 'ordinateur',
      description: [
        'marque Dell',
        'consomation: 500kwh/an'
      ],
      isOn: false
    }
  ]

  public appareilsSubject: Subject<Appareil[]>

  constructor() {
    this.appareilsSubject = new Subject()
  }

  publishAppareils() {
    this.appareilsSubject.next(this.appareilsList.slice())
  }

  getAppareilById(id: number): Appareil {
    return this.appareilsList[id]
  }
}