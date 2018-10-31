import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import classNames from 'classnames';
import './style.css';


class Editor extends Component {
  state = {
    isFocusd: false,
    left: 184,
    offsetX: 0,
    top: 84,
    offsetY: 0,
    width: 400,
    originWidth: 400, //  同 width
    editAble: false,
  }

  /**
    只需要监听 拖动过程中 函数，通过 evt.isFinal 判断拖动是否结束
  */
  onPan = (evt, resizeDirection = null) => {
    const { left, top, originWidth } = this.state;

    if (resizeDirection === 'left') {
      const newOriginWidthLeft = originWidth + -evt.deltaX;
      this.setState({
        width: newOriginWidthLeft,
        offsetX: evt.deltaX,
      });
      if (evt.isFinal) {
        this.setState({
          left: evt.deltaX + left,
          offsetX: 0,
          originWidth: newOriginWidthLeft,
        });
      }
    } else if (resizeDirection === 'right') {
      const newOriginWidthRight = originWidth + evt.deltaX;
      this.setState({ width: newOriginWidthRight });
      if (evt.isFinal) {
        this.setState({
          originWidth: newOriginWidthRight,
        });
      }
    } else {
      this.setState({ offsetX: evt.deltaX, offsetY: evt.deltaY });
      if (evt.isFinal) {
        this.setState({
          left: evt.deltaX + left,
          top: evt.deltaY + top,
          offsetX: 0,
          offsetY: 0,
        });
      }
    }
  }

  handleDoubleClick = () => {
    const { id } = this.props;
    const ckeditor = _.get(window, 'CKEDITOR', null);
    if (ckeditor) {
      const instances = _.get(ckeditor, 'instances', {});

      if (!_.has(instances, id)) {
        ckeditor.inline(id);
      }
    }
    this.setState({ editAble: true });
  }

  render() {
    const { id, children } = this.props;
    const { isFocusd, left, offsetX, top, offsetY, width, editAble } = this.state;

    return (
      <div
        className={classNames({ 'at-block': true, 'is-focused': isFocusd })}
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          left,
          top,
          width: `${width}px`,
        }}
        onClick={() => { this.setState({ isFocusd: true }); }}
      >
        <Hammer onPan={this.onPan}>
          <article
            id={id}
            className="hammer-article-content"
            onDoubleClick={this.handleDoubleClick}
            contentEditable={editAble}
            suppressContentEditableWarning // 禁用控制台警告
          >
            {children}
          </article>
        </Hammer>
        {isFocusd
        && (
          <div className="hammer-resizer">
            <Hammer onPan={(evt) => this.onPan(evt, 'left')}>
              <div
                className="hammer-anchor"
                data-resize-direction="left"
              />
            </Hammer>
            <Hammer onPan={(evt) => this.onPan(evt, 'right')}>
              <div
                className="hammer-anchor"
                data-resize-direction="right"
              />
            </Hammer>
          </div>
        )
        }
      </div>
    );
  }
}
Editor.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

Editor.defaultProps = {
  id: 'article-1',
  children: '',
};
export default Editor;
