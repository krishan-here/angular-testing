import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoService { 
	private _url = "http://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { 
  }

  add(todo) {
    return this.http.post(this._url, todo);
  }

  getTodos() { 
    return this.http.get(this._url);
  }

  getTodosPromise() {
    return this.http.get(this._url);
  }

  delete(id) {
    return this.http.delete(this._url);
  }
}