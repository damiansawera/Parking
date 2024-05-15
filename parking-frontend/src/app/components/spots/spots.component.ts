import { Component, Input } from '@angular/core';
import { HomeComponent } from "../home/home.component";


@Component({
    selector: 'app-spots',
    standalone: true,
    templateUrl: './spots.component.html',
    styleUrl: './spots.component.css',
    imports: [HomeComponent]
})
export class SpotsComponent {
  @Input() spots: any[] = [];

  currentPage: number = 1;
  spotsPerPage: number = 5;

  get totalPages(): number {
    return Math.ceil(this.spots.length / this.spotsPerPage)
  }

  get pagedSpots(): any[] {
    const startIndex = (this.currentPage - 1) * this.spotsPerPage;
    const endIndex = startIndex + this.spotsPerPage;
    return this.spots.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
