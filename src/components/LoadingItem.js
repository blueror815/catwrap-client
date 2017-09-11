//https://github.com/arwong09/portfolio
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import style from './animations/loadingItem.css'
const img = '/image/loading-item.png'

export default function () {
  return (
    <ReactCSSTransitionGroup
      transitionName="loadingItem"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
      <img className="feed__loading-item" src={img} />
    </ReactCSSTransitionGroup>
  )
}
