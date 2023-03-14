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

    it("should emit myVoteChanged when downVote", ()=> {
        let vote = {myVote: 0}
        component.myVoteChanged.subscribe(v => vote = v);

        component.downVote();

        expect(component.myVote).toBe(-1);
        expect(vote).toEqual({myVote: -1});
    });
    
    it("should NOT emit myVoteChanged when already downVote", ()=> {
        let vote = {myVote: 0}
        component.myVote = -1;
        component.myVoteChanged.subscribe(v => vote = v);

        component.downVote();

        expect(vote).toEqual({myVote: 0});
    });

    it("should calculate total vote correctly", ()=> {
        component.myVote = 1;
        component.othersVote = 2;

        expect(component.totalVotes).toBe(3);
    })

})