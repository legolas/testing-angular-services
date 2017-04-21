import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    private loggedIn: boolean;

    constructor(private http: Http) {
    }

    isLoggedIn(): boolean {
        return this.loggedIn
    }

    login(credentials): Observable<Response> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this
            .http
            .post("/login",
                JSON.stringify(credentials),
                {headers}
            );
    }
}
