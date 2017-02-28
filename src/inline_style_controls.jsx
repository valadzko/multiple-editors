import React from 'react';
import StyleButton from './style_button'

export default class InlineStyleControls extends React.Component {

  constructor(props){
    super(props)
    this.currentStyle = props.editorState.getCurrentInlineStyle();
  }

  render(){
    var INLINE_STYLES = [
      {label: 'Bold', style: 'BOLD'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'},
    ];

    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={this.currentStyle.has(type.style)}
            label={type.label}
            onToggle={this.props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  }
}
