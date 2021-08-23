// npm install --save firebase

import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import { Observable } from "rxjs";
import { ChatMessage } from "../../models/chat-message.model";
import { History } from "../../models/history.model";
import { User } from "../../models/user-info.model";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

@Injectable({
    providedIn: 'root',
})

export class FireBaseService {
    private historyTable: firebase.database.Reference;


    constructor() {
        this.initFireBaseApp();
    }

    private initFireBaseApp() {
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDwghdTsWkYjoe7s-hiVntkOEp8odtRq5Q",
            authDomain: "angular-chat-room-c5673.firebaseapp.com",
            projectId: "angular-chat-room-c5673",
            storageBucket: "angular-chat-room-c5673.appspot.com",
            messagingSenderId: "767651941036",
            appId: "1:767651941036:web:f35327895c7ce933afad09"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // firebase.database();
    }

    public loadHistory(): Observable<Array<History>> {
        this.historyTable = firebase.database().ref('history');
        return new Observable<Array<History>>(observer => {
            this.historyTable.on('value', (snapshot) => {
                const historyMap = snapshot.val();
                console.log(historyMap);
                observer.next(historyMap);
            });
        })
    }

    public saveChatToHistoryTable(messages: Array<ChatMessage>, user: User|undefined, roomId: string|undefined): void {
        const history: History = {
            historyId: Date.now().toString(),
            user: user,
            messages: messages,
            roomId: roomId,
            savedAt: Date.now(),
        }
        firebase.database().ref('history/' + history.historyId).set(history);
    }
}
