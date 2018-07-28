'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _insertDriveFile = require('material-ui/svg-icons/editor/insert-drive-file');

var _insertDriveFile2 = _interopRequireDefault(_insertDriveFile);

var _cloudUpload = require('material-ui/svg-icons/file/cloud-upload');

var _cloudUpload2 = _interopRequireDefault(_cloudUpload);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

require('./index.css');

var _helpers = require('./helpers/helpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaterialDropZone = function (_React$Component) {
    (0, _inherits3.default)(MaterialDropZone, _React$Component);

    function MaterialDropZone(props) {
        (0, _classCallCheck3.default)(this, MaterialDropZone);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MaterialDropZone.__proto__ || (0, _getPrototypeOf2.default)(MaterialDropZone)).call(this, props));

        _this.state = {
            open: false,
            openSnackBar: false,
            errorMessage: '',
            files: _this.props.files || [],
            disabled: true,
            acceptedFiles: _this.props.acceptedFiles || ['image/jpeg', 'image/png', 'image/bmp', 'audio/mp4', 'audio/m4a', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        };
        return _this;
    }

    (0, _createClass3.default)(MaterialDropZone, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                open: nextProps.open,
                files: nextProps.files
            });
        }
    }, {
        key: 'handleClose',
        value: function handleClose() {
            this.props.closeDialog();
            this.setState({ open: false });
        }
    }, {
        key: 'onDrop',
        value: function onDrop(files) {
            var oldFiles = this.state.files;
            var filesLimit = this.props.filesLimit || '3';

            oldFiles = oldFiles.concat(files);
            if (oldFiles.length > filesLimit) {
                this.setState({
                    openSnackBar: true,
                    errorMessage: 'Cannot upload more then ' + filesLimit + ' items.'
                });
            } else {
                this.setState({
                    files: oldFiles
                }, this.changeButtonDisable);
            }
        }
    }, {
        key: 'handleRemove',
        value: function handleRemove(file, fileIndex) {
            var files = this.state.files;
            // This is to prevent memory leaks.
            window.URL.revokeObjectURL(file.preview);

            files.splice(fileIndex, 1);
            this.setState(files, this.changeButtonDisable);

            if (file.path) {
                this.props.deleteFile(file);
            }
        }
    }, {
        key: 'changeButtonDisable',
        value: function changeButtonDisable() {
            if (this.state.files.length !== 0) {
                this.setState({
                    disabled: false
                });
            } else {
                this.setState({
                    disabled: true
                });
            }
        }
    }, {
        key: 'saveFiles',
        value: function saveFiles() {
            var filesLimit = this.props.filesLimit || '3';

            if (this.state.files.length > filesLimit) {
                this.setState({
                    openSnackBar: true,
                    errorMessage: 'Cannot upload more then ' + filesLimit + ' items.'
                });
            } else {
                this.props.saveFiles(this.state.files);
            }
        }
    }, {
        key: 'onDropRejected',
        value: function onDropRejected() {
            this.setState({
                openSnackBar: true,
                errorMessage: 'File too big, max size is 3MB'
            });
        }
    }, {
        key: 'handleRequestCloseSnackBar',
        value: function handleRequestCloseSnackBar() {
            this.setState({
                openSnackBar: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var img = void 0;
            var previews = '';
            var fileSizeLimit = this.props.maxSize || 3000000;

            if (this.props.showPreviews === true) {
                previews = this.state.files.map(function (file, i) {
                    var path = file.preview || '/pic' + file.path;

                    if ((0, _helpers.isImage)(file)) {
                        //show image preview.
                        img = _react2.default.createElement('img', { className: 'smallPreviewImg', src: path });
                    } else {
                        //Show default file image in preview.
                        img = _react2.default.createElement(_insertDriveFile2.default, { className: 'smallPreviewImg' });
                    }

                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'imageContainer col fileIconImg', key: i },
                            img,
                            _react2.default.createElement(
                                'div',
                                { className: 'middle' },
                                _react2.default.createElement(
                                    _IconButton2.default,
                                    { touch: true },
                                    _react2.default.createElement(_clear2.default, {
                                        className: 'removeBtn',
                                        onClick: _this2.handleRemove.bind(_this2, file, i)
                                    })
                                )
                            )
                        )
                    );
                });
            }

            var actions = [_react2.default.createElement(_FlatButton2.default, {
                label: 'Cancel',
                primary: true,
                onClick: this.handleClose.bind(this)
            }), _react2.default.createElement(_FlatButton2.default, {
                label: 'Submit',
                primary: true,
                disabled: this.state.disabled,
                onClick: this.saveFiles.bind(this)
            })];

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Dialog2.default,
                    {
                        title: 'Upload File',
                        actions: actions,
                        modal: false,
                        open: this.state.open,
                        onRequestClose: this.handleClose.bind(this),
                        autoScrollBodyContent: true
                    },
                    _react2.default.createElement(
                        _reactDropzone2.default,
                        {
                            accept: this.props.acceptedFiles.join(','),
                            onDrop: this.onDrop.bind(this),
                            className: 'dropZone',
                            acceptClassName: 'stripes',
                            rejectClassName: 'rejectStripes',
                            onDropRejected: this.onDropRejected.bind(this),
                            maxSize: fileSizeLimit
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'dropzoneTextStyle' },
                            _react2.default.createElement(
                                'p',
                                { className: 'dropzoneParagraph' },
                                'Drag and drop an image file here or click'
                            ),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(_cloudUpload2.default, { className: 'uploadIconSize' })
                        )
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        this.state.files.length ? _react2.default.createElement(
                            'span',
                            null,
                            'Preview:'
                        ) : ''
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        previews
                    )
                ),
                _react2.default.createElement(_Snackbar2.default, {
                    open: this.state.openSnackBar,
                    message: this.state.errorMessage,
                    autoHideDuration: 4000,
                    onRequestClose: this.handleRequestCloseSnackBar
                })
            );
        }
    }]);
    return MaterialDropZone;
}(_react2.default.Component);

exports.default = MaterialDropZone;