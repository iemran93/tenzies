import PropTypes from "prop-types"

function Dice({ number, onFreeze, isFreeze }) {
  return (
    <div className={`dice ${isFreeze ? "frozen" : ""}`} onClick={onFreeze}>
    <span>{number}</span>
      </div>
  )
}

Dice.propTypes = {
  number: PropTypes.any,
  onFreeze: PropTypes.any,
  isFreeze: PropTypes.any,
}

export default Dice
