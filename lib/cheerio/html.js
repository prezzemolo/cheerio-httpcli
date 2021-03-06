/*eslint no-invalid-this:0*/
/*jshint -W100*/

'use strict';

var util   = require('util');
var colors = require('colors/safe');
var cutil  = require('./util');

module.exports = function (encoding, client, cheerio) {
  /**
   * cheerio.load()の際にdecodeEntitiesをtrueにするとhtml()メソッドで文字列が
   * すべてエンティティ表記になってしまうのでエンティティをデコードするように拡張する
   *
   * @param str 指定した場合はその文字列を要素のHTMLとして設定
   *            指定しない場合は要素に設定されているHTMLを返す
   */
  // cheerioデフォルトのhtmlメソッドをentityHtmlとして退避
  cheerio.prototype.entityHtml = cheerio.prototype.html;

  cheerio.prototype.html = function (str) {
    // cheerioデフォルトのhtml()結果をデコード(エンティティ可読文字化)したものを返す
    return cutil.decodeEntities(this.entityHtml(str));
  };


  /***
   * [DEPRICATED] 将来削除予定
   */
  var depricatedMessage = '[DEPRICATED] %s() will be removed in the future)';
  cheerio.prototype._text = function (str) {
    console.warn(colors.yellow(util.format(depricatedMessage, '_text')));
    return this.text(str);
  };

  cheerio.prototype._html = function (str) {
    console.warn(colors.yellow(util.format(depricatedMessage, '_html')));
    return this.html(str);
  };
};
