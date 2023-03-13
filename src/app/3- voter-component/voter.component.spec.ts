import { VoterComponent } from "./voter.component"

describe("VoterComponent", ()=> {
    let component: VoterComponent;
    beforeEach(()=> {
        component = new VoterComponent();
    });

    it("should not emit myVoteChanged when already upvoted", ()=> {
        component.myVote = 1;
        let vote = {myVote: 0}
        component.myVoteChanged.subscribe(v => vote = v);

        component.upVote();        

        expect(vote).toEqual({myVote: 0});
    });

    it("should emit myVoteChanged when upvote", ()=> {
        let vote = {myVote: 0}
        component.myVoteChanged.subscribe(v => vote = v);

        component.upVote();

        expect(component.myVote).toBe(1);
        expect(vote).toEqual({myVote: 1});
    });
})