import { inject, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
// Make sure to include the Response object from '@angular/http'
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';

describe("UserService", () => {

    let subject: UserService;
    let backend: MockBackend;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                UserService
            ]
        });
    });

    beforeEach(inject([UserService, MockBackend], (userService: UserService, mockBackend: MockBackend) => {
        subject = userService;
        backend = mockBackend;
    }));

    it("#isLoggedIn should return false after creation",
        inject([UserService], (service: UserService) => {
            expect(service.isLoggedIn()).toBeFalsy();
        }));

    it("#login should call endpoint and return it's result", (done) => {
        backend.connections.subscribe((connection: MockConnection) => {
            let options = new ResponseOptions({
                body: JSON.stringify({success: true})
            });
            connection.mockRespond(new Response(options));

            // Check the request method
            expect(connection.request.method).toEqual(RequestMethod.Post);
            // Check the url
            expect(connection.request.url).toEqual("/login");
            // Check the body
            // expect(connection.request.text())
            expect(connection.request.text()).toEqual(JSON.stringify({username: "admin", password: "secret"}));
            // Check the request headers
            expect(connection.request.headers.get("Content-Type")).toEqual("application/json");
        });

        subject
            .login({username: "admin", password: "secret"})
            .subscribe((response) => {
                // Check the response
                expect(response.json()).toEqual({success: true});
                done();
            })
    });
});
