import './index.css'

const TagsButtonsList = props => {
  const {tagItem, tagClicked, isActive} = props
  const {optionId, displayText} = tagItem

  const buttonStyle = isActive ? 'active_button' : 'inActive_button'

  const onClickTag = () => {
    tagClicked(optionId)
  }

  return (
    <li key={optionId}>
      <button
        type="button"
        className={`tag_button ${buttonStyle}`}
        onClick={onClickTag}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagsButtonsList
