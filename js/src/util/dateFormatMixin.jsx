module.exports = function(){
  return {
    timeAgo: function(time){
      switch (typeof time) {
        case 'number': break;
        case 'string': time = new Date(time).getTime(); break;
        case 'object': if (time.constructor === Date) time = time.getTime(); break;
        default: time = +new Date();
      }
      var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400] // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      ];
      
      var seconds = (new Date().getTime() - time) / 1000;
      if(seconds <= 59) {
        return 'Just now'
      }
      var i = 0;
      var format;
      for(i; i < time_formats.length; i++) {
        format = time_formats[i];
        if(seconds < format[0]) {
          if(format[2] === undefined) {
            return format[1];
          } else
            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + 'ago';
          }
        }
    }
  }
}