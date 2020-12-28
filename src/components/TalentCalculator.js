import React, { useReducer } from "react";
import PointTracker from "./PointTracker";
import TalentPath from "./TalentPath";
import { talentCalculatorReducer, initialState } from "../store/reducer";

// TalentCalculator is a composite component that holds the parent state and passes it down
// along with callbacks to the child components
const TalentCalculator = () => { 
    const [state, dispatch] = useReducer(talentCalculatorReducer, initialState);
    // canSetActive is a method that returns a boolean based on whether or not a talent may or may not be
    // set to active
    function canSetActive(state, path, level) {
        // Set booleans for conditions based on whether or not the first talent in
        // a given path is inactive, whether or not the talent immediately prior to the
        // talent we're currently working with is active, whether or not the current talent itself is active,
        // and whether or not the user has available points to spend
        const firstIsInactive = (level === 0 && !state.talents[path][0].active);
        const previousIsActive = (level > 0 && state.talents[path][level - 1].active);
        const talentIsInactive = (!state.talents[path][level].active)
        const hasAvailablePoints = (state.availablePoints > 0);
        if ((firstIsInactive || previousIsActive) && talentIsInactive && hasAvailablePoints) {
            return true;
        } else {
            return false;
        }
    }

    // canSetActive is a method that returns a boolean based on whether or not a talent may or may not be
    // set to inactive
    function canSetInactive(state, path, level) {
        // Set booleans for conditions based on whether or not the last talent in
        // a given path is active, whether or not the talent immediately prior to the
        // talent we're currently working with is active, wheter or not the current talent itself is active
        const p = state[path];
        const lastIsActive = (level === p.length - 1 && p[p.length - 1].active);
        const previousIsActive = (level < p.length - 1 && !state[path][level + 1].active);
        const talentIsActive = (state[path][level].active)
        if ((lastIsActive || previousIsActive) && talentIsActive) {
            return true;
        } else {
            return false;
        }
    }

    // activateTalent dispatches an action to update the application state with the talent that needs
    // to be set as active
    function activateTalent(path, level) {
        if (canSetActive(state, path, level)) {
            dispatch({type: 'SET_TALENT_ACTIVE', path, level})
        } else if (state.points === 0) {
            console.log("You do not have any talent points available!")
        } else {
            // Show user feedback
            console.log("You are not a high enough level yet!")
        };   
    }

    // deactivateTalent dispatches an action to update the application state with the talent that needs
    // to be set as inactive
    function deactivateTalent(path, level) {
        if (canSetInactive(state.talents, path, level)) {
            dispatch({type: 'SET_TALENT_INACTIVE', path, level})
        } else {
            // Show user feedback
            console.log("You cannot remove this talent until you remove a higher level talent first!")
        };   
    }
    return(
    <div className="TalentCalculator">
        <header className="centered-text">TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</header>
        <div className="flex-container">
            <ul>
            { 
                state.talents.map((spriteCoord, pathIdx) => {
                    return <li key={pathIdx}>
                                <label>TALENT PATH {pathIdx + 1}</label>
                                <TalentPath
                                    path={pathIdx}
                                    talents={state.talents}
                                    spriteCoords={spriteCoord} 
                                    setActive={activateTalent}
                                    setInactive={deactivateTalent}/>
                            </li>
                })
            }
            </ul>
            <PointTracker points={state.availablePoints}/>
        </div>
    </div>
    )
}

export default TalentCalculator