import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';

  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [
    { description: 'eat', done: true },
    { description: 'sleep', done: false },
    { description: 'play', done: false },
    { description: 'laugh', done: false },
  ];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === 'done' ?
      item.done : !item.done);
  }

  remove(item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }

  addItem(description: string) {
    this.allItems.unshift({
      description,
      done: false
    });
  }

  changePositionDown(item) {
    let a = this.allItems.indexOf(item);
    this.allItems.splice(a, 1);
    this.allItems.splice(a + 1, 0, item);
  }

  changePositionUp(item) {
    let a = this.allItems.indexOf(item);
    this.allItems.splice(a, 1);
    this.allItems.splice(a - 1, 0, item);
  }
  
  removeAllDone() {
    for (let index = this.allItems.length - 1; index >= 0; index--) {
      const element = this.allItems[index];
      if (element.done == true) {
        this.remove(element);
      }
    }
  }

}


