import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import Wrapper from './Wrapper'
import Messages from './Messages'

const mapStateToProps = state => ({
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const Chat = ({ chat }) => (
  <Wrapper>
    <Messages messages={chat} />
    {/* <ChatInput /> */}
  </Wrapper>
)
Chat.propTypes = {
  chat: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat)
