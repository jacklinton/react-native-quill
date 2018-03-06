import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import { BubbleTheme } from './Themes/index';

class ReactQuillContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { editorHtml: '', mountedEditor: false };// You can also pass a Quill Delta here
        this.quillRef = null;
        this.reactQuillRef = null;
        this.handleChange = this.handleChange.bind(this);
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    componentDidMount() {
        this.attachQuillRefs()
    }

    componentDidUpdate() {
        this.attachQuillRefs()
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    };

    insertText = () => {
        var range = this.quillRef.getSelection();
        let position = range ? range.index : 0;
        this.quillRef.insertText(position, 'Hello, World! ')
    };

    render() {
        return (
            <ReactQuill
                ref={ (c) => {this.reactQuillRef = c} }
                value={this.state.text}
                onChange={this.handleChange}
                theme={BubbleTheme}
                readOnly={false}
                modules={ReactQuillContainer.modules}
                formats={ReactQuillContainer.formats}
                defaultValue={this.state.editorHtml}
                placeholder={this.props.placeholder}
            />
        )
    }
}

const RQuill = () => <ReactQuillContainer/>;
export default RQuill;
/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
ReactQuillContainer.modules = {};
ReactQuillContainer.modules.toolbar = [
    ['bold', 'italic', 'underline'],       // toggled buttons
    // ['blockquote', 'code-block'],                    // blocks
    // [{ 'header': 1 }, { 'header': 2 }],              // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
    // [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
    // [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
    [{ 'direction': 'rtl' }],                        // text direction
    // [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, false] }],       // header dropdown
    [{ 'background': [] }],         // dropdown with defaults
    // [{ 'font': [] }],                                // font family
    // [{ 'align': [] }],                               // text align
    // ['clean'],                                       // remove formatting
];

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
ReactQuillContainer.formats = [
    'header', 'font', 'background', 'color', 'code', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'script', 'align', 'direction',
    'link', 'image', 'code-block', 'formula', 'video'
];

ReactQuillContainer.propTypes = {
    placeholder: React.PropTypes.string,
};
