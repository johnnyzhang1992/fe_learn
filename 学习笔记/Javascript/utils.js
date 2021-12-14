/**
 * 解析一个url并生成window.location对象中包含的域
 * location:
 * {
 *      href: '包含完整的url',
 *      origin: '包含协议到pathname之前的内容',
 *      protocol: 'url使用的协议，包含末尾的:',
 *      username: '用户名', // 暂时不支持
 *      password: '密码',  // 暂时不支持
 *      host: '完整主机名，包含:和端口',
 *      hostname: '主机名，不包含端口'
 *      port: '端口号',
 *      pathname: '服务器上访问资源的路径/开头',
 *      search: 'query string，?开头',
 *      hash: '#开头的fragment identifier'
 * }
 *
 * @param {string} url 需要解析的url
 * @return {Object} 包含url信息的对象
 */
 
 
 function parseUrl(url) {
    var result = {};
    var keys = ['href', 'origin', 'protocol', 'host',
                'hostname', 'port', 'pathname', 'search', 'hash'];
    var i, len;
    var regexp = /(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;

    var match = regexp.exec(url);
	 console.info('match=', match);
	 
    if (match) {
        for (i = keys.length - 1; i >= 0; --i) {
            result[keys[i]] = match[i] ? match[i] : '';
        }
    }
	 console.info('result=', result);
    return result;
}

parseUrl("http://test.com:8080?name=1&password=2#page1");

结果：
match=[ 
  'http://test.com:8080?name=1&password=2#page1',
  'http://test.com:8080',
  'http:',
  'test.com:8080',
  'test.com',
  ':8080',
  undefined,
  '?name=1&password=2',
  '#page1',
  index: 0,
  input: 'http://test.com:8080?name=1&password=2#page1' 
]

result={ 
  hash: '#page1',
  search: '?name=1&password=2',
  pathname: '',
  port: ':8080',
  hostname: 'test.com',
  host: 'test.com:8080',
  protocol: 'http:',
  origin: 'http://test.com:8080',
  href: 'http://test.com:8080?name=1&password=2#page1' 
}
