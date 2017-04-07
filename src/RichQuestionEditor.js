import React, {Component, PropTypes} from 'react';
import {BASE_URL, config} from './helpers.js';
import axios from 'axios';
import RichTextEditor from 'react-rte';
import {EditorState, convertFromRaw, convertToRaw, RichUtils} from 'draft-js';


class RichQuestionEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      richEditorState: RichTextEditor.createEmptyValue(),
      error:""
    }
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  onChange = (richEditorState) => {
    this.setState({richEditorState});
  };

  handleSubmit() {
    let html = this.state.richEditorState.toString('html')
    return axios.post(`${BASE_URL}/api/questions`,{
        title: html
      }, config()
    ).then( () => 
      this.setState({
        richEditorState: RichTextEditor.createEmptyValue()
      })
    ).catch(response => {
      this.setState({
        error: "There was an error, please try again."
      })
    })
  };

  render () {

    const toolbarConfig = {
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
      ],
      BLOCK_TYPE_DROPDOWN: [
        {label: 'Normal', style: 'unstyled'},
        {label: 'Heading Large', style: 'header-one'},
        {label: 'Heading Medium', style: 'header-two'},
        {label: 'Heading Small', style: 'header-three'}
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'}
      ]
    };

    let retrievedHTML = {__html: this.state.retrievedHTML}
    let error = (this.state.error) ? <p>{this.state.error}</p> : null;

    return (
      <div>
        <div className="content">
            <RichTextEditor
              value={this.state.richEditorState}
              onChange={this.onChange}
              toolbarConfig={toolbarConfig}
            />
            <button onClick={this.handleSubmit}>SUBMIT</button>
        </div>
        {error}
      </div>
    );
  }

}

export default RichQuestionEditor;
