import React from 'react'

export default () => (
  <filter id="dropshadow" height="130%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
    <feOffset dx="0" dy="2" result="offsetblur" />
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
)
