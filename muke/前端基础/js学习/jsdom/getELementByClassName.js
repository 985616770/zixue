var getElementsByClassName = function(opts) {
  var searchClass = opts.searchClass;
  var node = opts.node || document;
  var tag = opts.tag || '*';
  var result = [];

  if (document.getElementsByClassName) {
    var nodes = node.getElementsByClassName(searchClass);
    if (tag !== '*') {
      for (var i = 0; node = nodes[i++];) {
        if (node.tagName === tag.toUpperCase()) {
          result.push(node);
        }
      }
    } else {
      result = nodes;
    }
    return result;
  } else {
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var i, j;
    var patten = `(^|/s)${searchClass}(/s|$)`;
    for (i = 0, j = 0; i < elsLen; i++) {
      if (patten.test(els[i].className)) {
        result[j] = els[i];
        j++;
      }
    }
  }
};
