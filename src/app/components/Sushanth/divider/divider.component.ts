import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'app-divider',
	templateUrl: './divider.component.html',
	styleUrls: ['./divider.component.css'],
})
export class DividerComponent implements OnInit {
	constructor() {}

	classDivider: string = 'custom-divider'
	styleDivider: string = ''

	classText: string = 'custom-text'
	styleText: string = 'padding: 0 10px;'

	@Input() customStyleSpan: string = ''
	@Input() customClassSpan: string = ''

	@Input() customStyleHeading: string = ''
	@Input() customClassHeading: string = ''

	@Input() value: string = ''

	@Input() textBgColor: string = ''

	ngOnInit(): void {
		this.styleText += `background: ${this.textBgColor};`
	}
}
