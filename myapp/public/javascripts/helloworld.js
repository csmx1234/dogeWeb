function hello() {
	alert("\u8001\u5A46\u5A46\u662F\u5446B");
}

new Vue({
  el: '#app',
  data: {
    messages: [{
      displaying: true,
      created_at: Date.now()
    }],
    now: Date.now(),
    kappa: '笨蛋'
  },
  mounted: function() {
    var self = this;
    console.log(this);
    setInterval(function() {
      self.$data.now = Date.now()
      self.$data.messages[0].displaying = !self.$data.messages[0].displaying
    }, 1000)
  },
  methods: {
    changeMsg: function() {
      this.kappa = (this.kappa == '笨蛋' ? 'lalala' : '笨蛋')
    }
  },
  components: {
    messages: {
    	data: function () {
    		return {
    			messages: [{
      			displaying: true,
      			created_at: Date.now()}],
    			now: Date.now(),
    			kappa: '笨蛋'
    		}
  		},
      props: ['now'],
      template: '<p>{{ timestamp }}</p>',
      computed: {
        timestamp: function() {
          this.now
          var display = "外接球"
		  var displaying = this.$data.messages[0].displaying
		  if ( displaying ) {
			  display = "外接球"
		  } else {
			  display = "内接球"
		  }
		  this.$data.messages[0].displaying = !displaying
          var zone = window.moment().utcOffset()
          var time = window.moment.utc(this.created_at).utcOffset(zone)
          var formatted = "Hello " + display + " It's " + time.format('HH:mm:ss MMM Do') + " now"
          return formatted;
        }
      }
    }
  }
})
