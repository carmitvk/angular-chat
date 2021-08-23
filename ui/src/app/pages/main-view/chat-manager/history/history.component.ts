import { Component, OnInit } from '@angular/core';
import { HistoryDataService } from 'src/app/core/services/data/history-data.service';
import { History } from 'src/app/core/services/models/history.model';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  constructor(public historyDataService: HistoryDataService) { }


  public identify(index: number, historyData: History): string{
    return historyData.historyId; 
  }

}
