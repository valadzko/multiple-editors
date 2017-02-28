import React from 'react';
import BlockStyleControls from './block_style_controls'
import InlineStyleControls from './inline_style_controls'

export default class Toolbar extends React.Component {

  render(){

    return (
      <div>
        <BlockStyleControls
          editorState={this.props.editorState}
          onToggle={this.props.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.props.editorState}
          onToggle={this.props.toggleInlineStyle}
        />
      </div>
    );
  }
}
