import { UsersComponent } from "./users.component";
import { UserService } from "./user.service";
import { HttpClient } from "@angular/common/http";
import { from, Observable, throwError } from "rxjs";

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
    });

    it("should delete user when confirm", ()=> {
        spyOn(window, "confirm").and.returnValues(true);
        const spyOnDeleteUser = spyOn(service, "deleteUser").and.callFake((res)=>{
            return from([true]);
        });
        component.users = [
            {id: 1, name: 'Rahul'},
            {id: 2, name: 'Rohan'}
        ];
        const deleteUser = {id: 2, name: 'Rohan'};

        component.deleteUser(deleteUser);

        expect(spyOnDeleteUser).toHaveBeenCalledOnceWith(2);
        expect(component.users.length).toBe(1);
    });

    it("should NOT delete user when cancelled", ()=> {
        spyOn(window, "confirm").and.returnValues(false);
        const spyOnDeleteUser = spyOn(service, "deleteUser").and.callFake((res)=>{
            return from([true]);
        });
        component.users = [
            {id: 1, name: 'Rahul'},
            {id: 2, name: 'Rohan'}
        ];
        const deleteUser = {id: 2, name: 'Rohan'};

        component.deleteUser(deleteUser);

        expect(spyOnDeleteUser).not.toHaveBeenCalled();

    });

    it("should undo deletion if server fails", ()=> {
        spyOn(window, "confirm").and.returnValues(true);
        const spyOnDeleteUser = spyOn(service, "deleteUser").and.callFake((res)=>{
            return throwError("error");
        });
        component.users = [
            {id: 1, name: 'Rahul'},
            {id: 2, name: 'Rohan'}
        ];
        const deleteUser = {id: 2, name: 'Rohan'};

        component.deleteUser(deleteUser);

        expect(component.users.length).toBe(2);
        expect(spyOnDeleteUser).toHaveBeenCalledWith(deleteUser.id);

    });
})