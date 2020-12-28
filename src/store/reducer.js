// initialState is the state of our application upon first entry, any new talents that are added to the current or
// any other sprite sheet may be easily utilized here by adding their coordinates to their respective talent path array
const initialState =  { 
    talents: [
        [{x: 0, y: 0, active: false}, {x: -50, y: 0, active: false}, {x: -100, y:0, active: false}, {x: -150, y:0, active: false}], 
        [{x: -200, y: 0, active: false}, {x: -250, y: 0, active: false}, {x: -300, y:0, active: false}, {x: -350, y:0, active: false}]
    ],
    availablePoints: 6,
    maxPoints: 6
};

// talentCalculatorReducer receives actions and updates our application state
// in the future for best practices sake one action should yield one state change, 
// but currently the application is still small enough to not give any trouble
function talentCalculatorReducer(state, action) {
    switch (action.type) {
        case 'SET_TALENT_ACTIVE':
            state = Object.assign({}, state);
            state.talents[action.path][action.level].active = true
            state.availablePoints = state.availablePoints - 1;
            return state;
        case 'SET_TALENT_INACTIVE':
            state = Object.assign({}, state);
            state.talents[action.path][action.level].active = false
            state.availablePoints = state.availablePoints + 1;
            return state;        default:
        return state;
    }
}

export { talentCalculatorReducer, initialState }