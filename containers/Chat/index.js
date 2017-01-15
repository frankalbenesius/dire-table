import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../../store/actions'

import ChatWrapper from '../../components/ChatWrapper'
import Messages from '../../components/Messages'

const mapStateToProps = state => ({
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const Chat = ({ chat }) => (
  <ChatWrapper>
    <Messages messages={chat} />
    {/* <ChatInput /> */}
  </ChatWrapper>
)
Chat.propTypes = {
  chat: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
