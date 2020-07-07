import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor() { }

  @Input() name:string='default'
  @Input() value: string= '';
  @Input() state: boolean=false;

  ngOnInit(): void {
  }

}
