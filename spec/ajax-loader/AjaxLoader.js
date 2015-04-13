describe('AjaxLoader', function() {
  var endpoint = '/path/to/example';
  var response = {
    contentType: 'application/json',
    responseText: JSON.stringify({
      'example': 'called'
    })
  };
  var loader, responseHandler;

  it('constructs an object for loading data from a single source', function() {
    expect(function() { new AjaxLoader(endpoint); }).not.toThrow();
  });

  it('requires a URL to be bassed to the constructor', function() {
    expect(function() { new AjaxLoader(); }).toThrow();
  });

  describe('provides a method to initiates the ajax call', function() {
    beforeEach(function() {

      jasmine.Ajax.install();

      loader = new AjaxLoader(endpoint);
      responseHandler = jasmine.createSpyObj('responseHandler', ['success', 'fail']);
    });

    it('should return a promise object', function() {
      var prom = loader.load();
      expect(prom.then).toBeDefined;
      expect(prom.always).toBeDefined;
      expect(prom.done).toBeDefined;
      expect(prom.fail).toBeDefined;
    });

    it('should resolve the promise when receiving a success response', function() {
      loader.load()
        .done(responseHandler.success)
        .fail(responseHandler.fail);

      jasmine.Ajax.requests.mostRecent().response(jQuery.extend(response, {'status': 200}));

      expect(responseHandler.success).toHaveBeenCalled();
      expect(responseHandler.fail).not.toHaveBeenCalled();
    });

    it('should reject the promise when receiving a failure response', function() {
      loader.load()
        .done(responseHandler.success)
        .fail(responseHandler.fail);

      jasmine.Ajax.requests.mostRecent().response(jQuery.extend(response, {'status': 404}));

      expect(responseHandler.success).not.toHaveBeenCalled();
      expect(responseHandler.fail).toHaveBeenCalled();
    });
  });
});