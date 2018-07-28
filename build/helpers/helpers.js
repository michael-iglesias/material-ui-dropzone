'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isImage = isImage;
function isImage(file) {
    var fileName = file.name || file.path;
    var suffix = fileName.substr(fileName.indexOf('.') + 1).toLowerCase();
    if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'png') {
        return true;
    }
}