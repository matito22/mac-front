import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";


@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modificationRent.html',
  styleUrl: './modificationRent.scss'
})
export class ModificationRent{

    constructor(){
    }
}