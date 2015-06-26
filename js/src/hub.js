/**
* Hub - Like a pub/sub, but only one object.
* Mixin to your React component via React mixins.
* Any component which "is" a Hub can subscribe to events with this.on('eventName', this).
* Rather than passing a function, you pass yourself as a receiver and implement a 'onEventName' (Camel-case version of event name starting with 'on').
* Then any other "Hub" component can broadcast via this.publish('eventName', {...}) and pass a data object.
* Use the return value of this.map('eventName', function(receiver) { return receiver.value(); }) to get a value from every receiver listening to 'eventName'.
* This is useful to collect a value from everyone such as requesting navigation or determining whether components are open or closed.
*/

module.exports = function() {
  var _map = {};
 
  return {
    subscribe: function(name, cb) {
      _map[name] || (_map[name] = []);
      _map[name].push(cb);
    },
 
    notify: function(name, data) {
      if (!_map[name]) {
        return;
      }
 
      // if you want canceling or anything else, add it in to this cb loop
      _map[name].forEach(function(cb) {
        cb(data);
      });
    }
  };
 
};