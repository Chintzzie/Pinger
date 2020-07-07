import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'vsf-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
	constructor() {}

	@Input() value: string = ''
	@Input() outline: boolean = false
	@Input() color: string = ''
	@Input() style: any = null
	@Input() size: string = ''
	@Input() type: string = ''

	class: string = 'custom-button w-100 btn'

	ngOnInit(): void {

		// outline modifier
		if (this.outline === true) {
			this.class += ' btn-outline-primary'
		} else {
			this.class += ' btn-primary'
		}

		// size modifier
		if (this.size === 'lg') {
			this.class += ' btn-lg'
		} else if (this.size === 'sm') {
			this.class += ' btn-sm'
		}

		// color modifier
		if (!(this.color === '')) {
			this.style += ` color : ${this.color}; `
		}
	}
}
