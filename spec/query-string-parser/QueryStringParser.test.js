describe('QueryStringParser', function() {
	var parser = new QueryStringParser();

	afterEach(function() {
		parser.setUrl(location.href);
	});

	it('should identify key value pairs', function() {
		parser.setUrl('http://www.test.com?foo=bar&cat=dog');
		expect(parser.getKeyValuePairs().length).toEqual(2);
	});

	it('should return 0 when there are no key value pairs in the url', function() {
		parser.setUrl('http://www.test.com');
		expect(parser.getKeyValuePairs().length).toEqual(0);
	});

	it('should retrieve a specific value from the querystring', function() {
		parser.setUrl('http://www.test.com?foo=bar&cat=dog');
		expect(parser.getParam('foo')).toEqual('bar');
		expect(parser.getParam('cat')).toEqual('dog');
	});

	it('should return null if a key doesn\'t exist but is queried', function() {
		parser.setUrl('http://www.test.com?foo=bar&cat=dog');
		expect(parser.getParam('somethingThatsNotThere')).toBeNull();
	});
	
	it('returns the last instance of a value if it appears more than once', function() {
		parser.setUrl('http://www.test.com?foo=first&foo=second');
		expect(parser.getParam('foo')).toEqual('second');
	});

	it('should return getParam as a String', function() {
		parser.setUrl('http://www.test.com?foo=100');
		expect(parser.getParam('foo')).toEqual('100');
		expect(parser.getParam('foo')).not.toEqual(100);
		expect(typeof parser.getParam('foo')).toEqual('string');
	});

	xit('should not include the hash when finding a key', function() {
		parser.setUrl('http://www.test.com?foo=bar&cat=dog#hashValue');
		expect(parser.getParam('cat')).toEqual('dog');
	});

	xit('should be able to return the hash ', function() {
		parser.setUrl('http://www.test.com?foo=bar&cat=dog#hashValue');
		expect(parser.getHash()).toEqual('hashValue');
	});

	xit('should return empty string if no hash is available', function() {
		parser.setUrl('http://www.test.com?foo=bar&cat=dog');
		expect(parser.getHash()).toEqual('');
	});
});