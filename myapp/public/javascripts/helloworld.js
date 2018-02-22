function hello() {
  alert("\u8001\u5A46\u5A46\u662F\u5446B");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var data = {
  messages: [{
    created_at: Date.now()
  }],
  displaying: true,
  now: Date.now(),
  seen: true,
  hideBtnName: "hide it",
  kappa: "笨蛋",
  title: "Jack",
  showing: true
};

async function start(){
  while (true) {
    data.showing = !data.showing;
    await sleep(1000);
  }
};

start();

var vm = new Vue({
  el: '#app',
  data: data,
  mounted: function() {
    var self = this;
    setInterval(function() {
      self.$data.now = Date.now()
      self.$data.displaying = !self.$data.displaying
    }, 1000)
  },
  methods: {
    changeMsg: function() {
      this.kappa = (this.kappa == '笨蛋' ? 'lalala' : '笨蛋')
    },
	  hideMsg: function() {
      this.seen = !this.seen
      this.hideBtnName = this.seen ? "hide it" : "show it"
    }
  },
  components: {
    messages: {
      data: function() {
        return {
          displaying: true
        }
      },
      props: ['now'],
      template: '<p>{{ timestamp }}</p>',
      computed: {
        timestamp: function() {
          this.now
          var displaying = this.$data.displaying
          var display = displaying ? "Siming" : "Jack"
          this.$data.displaying = !displaying
          var zone = window.moment().utcOffset()
          var time = window.moment.utc(this.created_at).utcOffset(zone)
          var formatted = "Hello " + display + " It's " + time.format('HH:mm:ss MMM Do') + " now"
          return formatted;
        }
      }
    }
  }
})
