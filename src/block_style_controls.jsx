import React from 'react';
import StyleButton from './style_button'

export default class BlockStyleControls extends React.Component {

  constructor(props){
    super(props)
    this.selection = this.props.editorState.getSelection();
    this.blockType = this.props.editorState
      .getCurrentContent()
      .getBlockForKey(this.selection.getStartKey())
      .getType();
  }

  render(){
    const BLOCK_TYPES = [
      {label: 'H1', style: 'header-one'},
      {label: 'H2', style: 'header-two'},
      {label: 'H3', style: 'header-three'},
      {label: 'H4', style: 'header-four'},
      {label: 'H5', style: 'header-five'},
      {label: 'H6', style: 'header-six'},
      {label: 'Blockquote', style: 'blockquote'},
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'},
      {label: 'Code Block', style: 'code-block'},
    ];

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === this.props.blockType}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  }
}
