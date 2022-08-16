// eslint-disable-next-line import/no-cycle
import { Book, nav1 } from './book.js';
import { DateTime } from '../node_modules/luxon/build/es6/luxon.js';

export default class List {
  constructor() {
    this.books = [];
    this.htmlResult = '';
    this.loaded = false;
    if (typeof (window) !== 'undefined') {
      window.addEventListener('load', () => {
        this.loaded = true;
        const btnAdd = document.querySelector('.add-btn');
        const currentDate = DateTime.now();
        document.querySelector('.time').innerHTML = currentDate.toLocaleString(DateTime.DATETIME_MED);
        btnAdd.addEventListener('click', (e) => {
          e.preventDefault();
          const form = document.forms[0];
          const title = form.title.value;
          const author = form.author.value;
          this.add(new Book(title, author));
        });
        this.updateList();
      });
    }
  }

  updateList() {
    if (!this.loaded) return;
    this.htmlResult = this.books.map((el) => `<li>
             <h6>"${el.title}"  by ${el.author} </h6>
             <button type="button">Remove</button>
      </li>`).join('');
    document.getElementById('books-list').innerHTML = this.htmlResult;
    document.getElementById('books-list').querySelectorAll('button').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.remove(i);
      });
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('books', JSON.stringify(this.books.map((x) => ({ ...x }))));
    }
  }

  load() {
    if (typeof window !== 'undefined') {
      this.books = JSON.parse(localStorage.getItem('books') || '[]').map((x) => new Book(x.title, x.author));
      this.updateList();
    }
  }

  add(x) {
    this.books.push(x);
    this.updateList();
  }

  remove(i) {
    this.books.splice(i, 1);
    this.updateList();
  }
}

nav1.initiate();