import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import Toolbar from './toolbar'

export default class RichEditor extends React.Component {
 constructor(props) {
   super(props);
   this.state = {editorState: EditorState.createEmpty()};

   this.focus = () => this.refs.editor.focus();
   this.onChange = (editorState) => this.setState({editorState});

   this.handleKeyCommand = (command) => this._handleKeyCommand(command);
   this.onTab = (e) => this._onTab(e);
   this.toggleBlockType = (type) => this._toggleBlockType(type);
   this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
 }

 _handleKeyCommand(command) {
   const {editorState} = this.state;
   const newState = RichUtils.handleKeyCommand(editorState, command);
   if (newState) {
     this.onChange(newState);
     return true;
   }
   return false;
 }

 _onTab(e) {
   const maxDepth = 4;
   this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
 }

 _toggleBlockType(blockType) {
   this.onChange(
     RichUtils.toggleBlockType(
       this.state.editorState,
       blockType
     )
   );
 }

 _toggleInlineStyle(inlineStyle) {
   this.onChange(
     RichUtils.toggleInlineStyle(
       this.state.editorState,
       inlineStyle
     )
   );
 }

getBlockStyle(block) {
   switch (block.getType()) {
     case 'blockquote': return 'RichEditor-blockquote';
     default: return null;
   }
 }

 render() {
   const {editorState} = this.state;

   // If the user changes block type before entering any text, we can
   // either style the placeholder or hide it. Let's just hide it now.
   let className = 'RichEditor-editor';
   var contentState = editorState.getCurrentContent();
   if (!contentState.hasText()) {
     if (contentState.getBlockMap().first().getType() !== 'unstyled') {
       className += ' RichEditor-hidePlaceholder';
     }
   }

   return (
     <div className="RichEditor-root">
       <Toolbar
         editorState={editorState}
         toggleBlockType={this.toggleBlockType}
         toggleInlineStyle={this.toggleInlineStyle}
        />
       <div className={className} onClick={this.focus}>
         <Editor
           blockStyleFn={this.getBlockStyle}
           editorState={editorState}
           handleKeyCommand={this.handleKeyCommand}
           onChange={this.onChange}
           onTab={this.onTab}
           placeholder="Tell me a success story..."
           ref="editor"
           spellCheck={true}
         />
       </div>
     </div>
   );
 }
}
