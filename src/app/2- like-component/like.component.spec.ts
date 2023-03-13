import { LikeComponent } from "./like.component";

describe("LikeComponent", ()=> {

    let component: LikeComponent;
    beforeEach(()=>{
        component = new LikeComponent();
    });


    it("should make like to be true when calling click method", ()=> {
        // arrange
        // let component = new LikeComponent();

        // act
        component.click();

        // assert
        expect(component.iLike).toBeTruthy();
    });

    it("should increase likecount when calling click method", ()=> {
        component.click();

        expect(component.totalLikes).toBe(1);
    });

    it("should decrease likecount when calling click method 2 times", ()=> {
        component.click();
        component.click();

        expect(component.totalLikes).toBe(0);
    });
})