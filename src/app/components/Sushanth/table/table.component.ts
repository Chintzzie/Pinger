import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
	constructor() {}

	state = 'even'

	@Input() tableStyle = ''
	@Input() headerStyle = ''
	@Input() bodyStyle = ''

	@Input() cols = ''

	@Input() headings = []

	// data array is 2d array where rows represent rows of the table
	// and elements in each row represent each element in a table row
	@Input() data = []

	ngOnInit(): void {}
}
