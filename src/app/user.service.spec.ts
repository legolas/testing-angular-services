import { inject, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';

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

    it("should send the login request to the server", (done) => {
        done();
    });

});
