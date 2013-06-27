// Pinger

var http = require('http');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

exports.ping = function(host, name) {

    return new Pinger(host, name);

};

function Pinger(host, name) {

    // private
    var _timeoutId;
    var _pingResponse, _pingStatusCode, _pingReponseHeaders;
    var _pingSuccess = true;
    var _responseAssertions = [];
    var self = this;
    
    // public
    self.host = host;
    self.name = name;
    
    self.ping = function() {
        var pingOptions = {	host: host };
        http.request(pingOptions, function(response) {
            var chunks = [], length = 0;
        
            response.on('data', function(chunk) {
                chunks.push(chunk);
                length += chunk.length;
            });
        
            response.on('end', function() {
                _pingStatusCode = response.statusCode;
                _pingReponseHeaders = response.headers;
                _pingResponse = combineChunks(chunks, length).toString();
                _responseAssertions.forEach(function(element) {
                    element[0](element[1]); // invokes the assertion method
                });
            });
            
        }).end();
            
        return self;
    };
    
    self.repeat = function(interval) {
        var _timeoutId = setInterval(self.ping, interval);
        return self;
    };
    
    self.responseCode = function(expectedCode) {
        _responseAssertions.push([assertResponseCode, expectedCode]);
        return self;
    };
    
    self.regex = function(expectedRegex) {
        _responseAssertions.push([assertRegex, expectedRegex]);
        return self;
    };
    
    var assertResponseCode = function(expectedCode) {
        if (_pingStatusCode != expectedCode)
            pingFailed();
        else
            pingSuccess();
    };
    
    var assertRegex = function(regex) {
        var regex = util.isRegExp(expectedRegex) ? expectedRegex : new RegExp(expectedRegex);
        if (!regex.test(_pingResponse))
            pingFailed();
        else
            pingSuccess();
    };
    
    var pingFailed = function() {
        _pingSuccess = false;
        self.emit('failure');
    };
    var pingSuccess = function() {
        self.emit('success');
    };
    
    self.ping();

}

Pinger.prototype.__proto__ = EventEmitter.prototype;

function combineChunks(chunks, length) {
    var buf = new Buffer(length);
    var offset = 0;
    for (var i = 0; i < chunks.length; i++) {
        var chunk = chunks[i];
        chunk.copy(buf, offset, 0);
        offset += chunk.length;
    }
    return buf;
}
