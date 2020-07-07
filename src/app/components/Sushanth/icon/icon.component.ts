import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.css'],
})
export class IconComponent implements OnInit {
	constructor() {}

	@Input() source
	@Input() style
	@Input() width = 45
	@Input() height = 45
	@Input() loading = 'lazy'

	ngOnInit(): void {}
}
