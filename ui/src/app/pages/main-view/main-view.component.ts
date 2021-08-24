import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HistoryDataService } from 'src/app/core/services/data/history-data.service';
import { RoomDataService } from 'src/app/core/services/data/room-data.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, OnDestroy{
  private subscription: Subject<void> = new Subject<void>();

  constructor(public roomDataService: RoomDataService,
              public historyDataService: HistoryDataService) { }

  ngOnInit(): void {
    this.loadData('');
    // this.activatedRoute.paramMap
    //   .pipe(
    //     map(params => (params.get('containerId') || '')),
    //     filter((containerId: string) => !!containerId),
    //     tap((containerId: string) => this.containerId = containerId ),
    //     tap((containerId: string) => this.loadData(containerId)),
    //     takeUntil(this.subscription),
    //   ).subscribe();
  }

  private loadData(containerId: string): void {
    this.roomDataService.updateData(); //loadRooms
    //this.historyDataService.loadHistory(); 
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
