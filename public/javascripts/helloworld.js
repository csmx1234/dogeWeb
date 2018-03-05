let _test_ = true;

/*=============================================>>>>>
= base functions =
===============================================>>>>>*/

function hello() {
  alert("\u8001\u5A46\u5A46\u662F\u5446B");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*= End of base functions =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= data =
===============================================>>>>>*/

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
  showing: true,
  typing: false
};

var msgData = {
  messages: [
  ],
  id: 1,
  newMsg: ""
};

/*= End of data =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= testing enviorment =
===============================================>>>>>*/

if ( _test_ ) {
  for ( ; msgData.id < 50; msgData.id++ ) {
    msgData.messages.push({
      id: msgData.id,
      msg: "hello"
    })
  }
}

/*= End of testing enviorment =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= function that change the variable periodically =
===============================================>>>>>*/

async function start(){
  while (true) {
    data.now = Date.now();
    data.displaying = !data.displaying;
    data.showing = !data.showing;
    await sleep(1000);
  }
};

start();

/*= End of function that change the variable periodically =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
= vue components =
===============================================>>>>>*/

var vm = new Vue({
  el: '#app',
  data: data,
  methods: {
    changeMsg: function() {
      this.kappa = (this.kappa == '笨蛋' ? 'lalala' : '笨蛋')
    },
	  hideMsg: function() {
      this.seen = !this.seen
      this.hideBtnName = this.seen ? "hide it" : "show it"
    },
    reset: _.debounce(
      function() {
        this.typing = false
      },
      500
    )
  },
  watch: {
    title: function( newName, oldName ) {
      this.typing = true
      this.reset()
    }
  },
  components: {
    messages: {
      data: function() {
        return data
      },
      props: ['now'],
      template: '<p>{{ timestamp }}</p>',
      computed: {
        timestamp: function() {
          this.now
          var display = this.displaying ? "Siming" : "Jack"
          var zone = window.moment().utcOffset()
          var time = window.moment.utc(this.created_at).utcOffset(zone)
          var formatted = "Hello " + display + " It's " + time.format('HH:mm:ss MMM Do') + " now"
          return formatted;
        }
      }
    }
  }
})

var msgs = new Vue({
  el: '#chatRoom',
  data: msgData,
  methods: {
    addNewMsg: function() {
      this.messages.push({
        id: this.id++,
        msg: this.newMsg
      })

      this.newMsg = ''
    }
  }
})

/*= End of vue components =*/
/*=============================================<<<<<*/
