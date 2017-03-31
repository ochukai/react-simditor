import React from 'react';
import ReactDOM from 'react-dom';

import 'simple-module';
import 'simple-uploader';
import Simditor from 'simditor';

import 'simditor/styles/simditor.css';

class SimEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const textbox = ReactDOM.findDOMNode(this.refs.textarea);

    const $textbox = $(textbox);
    const editor = this.editor = new Simditor({
      textarea: $textbox,
      toolbar: [
        'title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'fontScale',
        'color',
        'ol',             // ordered list
        'ul',             // unordered list
        'blockquote',
        'code',           // code block
        'table',
        'link',
        'image',
        'hr',             // horizontal ruler
        'indent',
        'outdent',
        'alignment',
      ],
      placeholder: '',
      defaultImage: '',
      pasteImage: true,
      imageButton: 'upload',
      upload: {
        url: '/file/uploadImageForSimEditor?fileElementId=upload_file',
        fileKey: 'upload_file',
        connectionCount: 3,
        leaveConfirm: '还在上传图片，确定要离开吗?',
      },
    });

    editor.setValue(this.props.content);

    // 修复上传打开慢的问题
    $('.toolbar-item-image input[type="file"]')
      .removeAttr('multiple')
      .attr('accept', 'image/gif, image/jpeg, image/jpg, image/png');
  }

  render() {
    return (
      <div>
        <textarea ref="textarea" />
      </div>
    );
  }
}

SimEditor.defaultProps = {
  content: '',
};

export default SimEditor;
