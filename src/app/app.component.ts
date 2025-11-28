import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'frontend';
  receivedData: string = '';

  constructor(private http: HttpClient) {}

  sendData(data: string) {
    if (!data) {
      alert('Введите текст!');
      return;
    }
    this.http.post('/save', data, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Успех:', response);
          alert('Данные отправлены!');
        },
        error: (error) => {
          console.error('Ошибка:', error);
          alert('Ошибка при отправке данных!');
        }
      });
  }

  loadData() {
    this.http.get('/read', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          console.log('Данные получены:', data);
          this.receivedData = data;
        },
        error: (error) => {
          console.error('Ошибка при загрузке:', error);
          if (error.status === 404) {
            this.receivedData = 'Файл ещё не создан. Сначала отправьте данные.';
          } else {
            alert('Ошибка при загрузке данных с сервера!');
          }
        }
      });
  }
}