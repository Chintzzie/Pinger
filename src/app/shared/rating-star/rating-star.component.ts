import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.css']
})
export class RatingStarComponent implements OnInit {

  @Input() rating;
  starWidth:Number;

  constructor() { }

  ngOnInit(): void {
    this.starWidth = this.rating * 150 / 10;
  }

}
