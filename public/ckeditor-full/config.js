/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';
  config.resize_enabled = true;
  config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Subscript,Superscript,Font,BGColor,Outdent,Indent';

  // Language
  config.defaultLanguage = 'zh-cn';
  config.language = 'zh-cn';

  // Dialog windows are also simplified.
  config.removeDialogTabs = 'link:advanced';
};
