import { UsersComponent } from "./users.component";
import { UserService } from "./user.service";
import { HttpClient } from "@angular/common/http";
import { from, Observable } from "rxjs";

describe("UsersComponent", ()=> {
    let component: UsersComponent;
    let service: UserService;
    let http: HttpClient;
    beforeEach(()=>{
        service = new UserService(http);
        component = new UsersComponent(service);
    });

    it("should fetch users on page load", ()=> {
        const data= [1,2,3];
        spyOn(service, "getUsers").and.callFake(()=> {
            return from([data]);
        });

        component.ngOnInit();

        expect(component.users).toEqual(data);
    })
})