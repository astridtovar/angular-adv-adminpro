import { Component, OnDestroy } from '@angular/core';
import {
  filter,
  map,
  retry,
  take
  } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  intervalSubs: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (valor) => {
    //       console.log('subs: ', valor);
    //     },
    //     (err) => {
    //       console.log('Error: ', err);
    //     },
    //     () => {
    //       console.log('Obs terminado');
    //     }
    //   );

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      take(10),
      map((valor) => valor + 1),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );
  }

  retornaObservable(): Observable<number> {
    let i = 0;

    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          console.log('i llego a 2');
          observer.error('i llego a 2');
        }
      }, 1000);
    });
  }
}
