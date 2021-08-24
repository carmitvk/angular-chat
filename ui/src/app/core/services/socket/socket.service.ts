import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../models/chat-message.model';
import { User } from '../models/user-info.model';

// npm i socket.io-client
// npm i @types/socket.io-client

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket: Socket;
  // private url = 'http://localhost:3030';
  private url = '/';

  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(data:{roomId: string, user: User | undefined}): void { 
    console.log('join-to-room', data);
    this.socket.emit('join-to-room', data);
  }

  sendMessage(chatMsg: ChatMessage): void {
    console.log('sendMessage', chatMsg);
    this.socket.emit('message', chatMsg);
  }

  sendTyping(user: User | undefined): void { 
    this.socket.emit('user-typing', user);
  }

  getMessage(): Observable< ChatMessage > {
    return new Observable< ChatMessage >(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });

      return () => {
        console.log('disconect function');
        this.socket.disconnect();
      }
    })
  }

  getUsers(): Observable<Array<User>> {
    return new Observable<Array<User>>(userObserver => {
      this.socket.on('users-in-room', (data) => {
        userObserver.next(data);
      });

      return () => {
        console.log('disconect function');
        this.socket.disconnect();
      }
    })
  }

  getTypingUser(): Observable<User> {
    return new Observable<User>(userObserver => {
      this.socket.on('typer', (data) => {
      // this.socket.on('typer', (data) => {
        userObserver.next(data);
      });

      return () => {
        console.log('disconect function');
        this.socket.disconnect();
      }
    })
  }

  disconnect(): void {
    console.log('disconect function');
    
    this.socket.emit('disconnect');
  }

}