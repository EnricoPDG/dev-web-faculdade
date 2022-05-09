import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpClient } from '@angular/common/http'
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) { }

  title = 'todo';

  filter: 'all' | 'active' | 'done' = 'all';

  allItems: any[] = [];

  letodosRegistros() {
    this.http.get<Item[]>(`/api/getAll`).subscribe(resultado => this.allItems = resultado);
  };

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === 'done' ?
      item.done : !item.done);
  }

  remove(item) {
    var indice = this.allItems.indexOf(item);
    var id = this.allItems[indice]._id;
    this.http.delete<Item>(`/api/delete/${id}`).subscribe(resultado => {
      console.log(resultado); this.letodosRegistros();
    });
  }

  addItem(description: string) {
    var produto = new Item();
    produto.description = description;
    produto.done = false;
    this.http.post<Item>(`/api/post`, produto).subscribe(resultado => {
      console.log(resultado);
      this.letodosRegistros();
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

  updateItem(item) {
    var indice = this.allItems.indexOf(item);
    var id = this.allItems[indice]._id;
    this.http.patch<Item>(`/api/update/${id}`, item).subscribe(resultado => {
      console.log(resultado);
      this.letodosRegistros();
    });
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


