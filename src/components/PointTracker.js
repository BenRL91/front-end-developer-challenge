import React from "react";
import PropTypes from "prop-types"

// PointTracker is a simple component that takes in a points prop and displays it along with some labeling and
// formatting to the screen
const PointTracker = (props) => {
    return(
    <div className="PointTracker">
        <h2 className="centered-text">
            {props.points} / 6
        </h2>
        <h2 className="centered-text">
            Points Spent
        </h2>

    </div>
    )
}

PointTracker.propTypes = {
    points: PropTypes.number.isRequired
}

export default PointTracker