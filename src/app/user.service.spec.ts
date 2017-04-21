import { inject, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

describe("UserService", () => {

    let subject: UserService;
    let backend: MockBackend;

    // beforeEachProviders();
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
        });

        subject
            .login({username: "admin", password: "secret"})
            .subscribe((response) => {
                expect(response.json()).toEqual({success: true});
                done();
            })
    });
});
