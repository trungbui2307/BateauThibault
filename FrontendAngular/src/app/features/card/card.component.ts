import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public cardId: number = -1;
  @Input() public title: string = '';
  @Input() public content: string = '';
  @Output() subjectClickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public onClickButton(): void {
    this.subjectClickEvent.emit({
      id: this.cardId
    });
  }

}
