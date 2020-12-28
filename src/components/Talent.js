import React from "react";
import PropTypes from "prop-types"

// Talent holds all the data necessary to display a talent, the backgound position may need to be updated if the system for
// rendering talent sprites changes in the future. e.g. the active talents are always 50px away from the inactive talents
const Talent = (props) => {
    const bgPosition = props.active ? `${props.spriteX}px ${props.spriteY}px` : `${props.spriteX}px ${props.spriteY + 50}px`
    return(
        <div className={ props.active ? "Talent active" : "Talent"}
            style={{backgroundImage: `url(${props.sprites})`, backgroundPosition: bgPosition}}                    
            onClick={() => props.setActive(props.path, props.level)}
            onContextMenu={(e) => {
                e.preventDefault();
                props.setInactive(props.path, props.level)
            }}></div>
    )
}

Talent.propTypes = {
    talents: PropTypes.array.isRequired,
    path: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    setActive: PropTypes.func.isRequired,
    setInactive: PropTypes.func.isRequired,
    sprites: PropTypes.string.isRequired,
    spriteX: PropTypes.number.isRequired,
    spriteY: PropTypes.number.isRequired,
}

export default Talent