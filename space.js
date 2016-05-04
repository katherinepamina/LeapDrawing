var ships = {};
var cats = {};
var shots = [];
var output = document.getElementById('crash');
var score = document.getElementById('score');
var crashed = false;
var last = Date.now();
var now;
var fired = false;
var bullet;
var count = 0;

Leap.loop(function(frame) {
    if(crashed){
      return;
    }
    
    score.innerHTML = "Score: " + count;
    frame.hands.forEach(function(hand, index) {

      var ship = ( ships[index] || (ships[index] = new SpaceShip()) );
      ship.setTransform(hand.screenPosition(), hand.roll());
      if(hand.pinchStrength == 1){
        bullet = new Fire(hand.screenPosition());
        shots.push(bullet);
      }
      for(var i = 0; i < shots.length; i++){
        shots[i].position[0] -= 15*Math.sin(hand.roll());
        shots[i].position[1] -= 15*Math.cos(hand.roll());
        shots[i].setTransform(shots[i].position);
      }
        
      for(var i = 0; i < 25; i++){
        var cat = (cats[i] || (cats[i] = new Cat()));
        var pos = hand.screenPosition();
        if(Math.abs(cat.position[0]-pos[0]) < cat.siz/2 && Math.abs(cat.position[1]-pos[1]) < cat.siz/2){
          output.innerHTML = "Crash!";
          crashed = true;
          crash(pos);
          return;
        }
        else {
          for(var j = 0; j < shots.length; j++){
            if(Math.abs(cat.position[0]-shots[j].position[0]) < cat.siz/2 && Math.abs(cat.position[1]-shots[j].position[1]) < cat.siz/2)
            {
              count += 1000;
              cat.position[0] = Math.random()*window.innerWidth;
              cat.position[1] = Math.random()*10;
              cat.siz = 10;
            }
          }
        }
          cat.position[0] += 5;
          cat.position[1] += 5;
          cat.siz += 1;
          cat.setTransform([cat.position[0], cat.position[1]], cat.siz);
        now = Date.now();
        count = (now - last);
        
      }

    });
}).use('screenPosition', {scale: 0.25});


var SpaceShip = function() {
  var cat = this;
  var img = document.createElement('img');
  img.src = 'http://www.clker.com/cliparts/V/5/Q/z/q/m/fighter-jet-hi.png';
  img.style.position = 'absolute';
  img.style.height = '10%';
  img.onload = function () {
    cat.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }

  cat.setTransform = function(position, rotation) {

    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';

    img.style.transform = 'rotate(' + -rotation + 'rad)';

    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

var Cat = function() {
  var cat = this;
  this.position = [Math.random()*window.innerWidth, Math.random()*10];
  this.siz = 10;
  var img = document.createElement('img');
  img.src = 'http://pre08.deviantart.net/c501/th/pre/i/2013/130/f/0/asteroid_stock_3_by_fimar-d64qqfu.png';
  img.style.position = 'absolute';
  img.style.height = "10px";
  img.style.width = "10px";
  img.onload = function () {
    cat.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }

  cat.setTransform = function(position, siz) {
    if(position[0] >= window.innerWidth || position[1] >= window.innerHeight || siz > 125){
      this.position[0] = Math.random()*window.innerWidth;
      this.position[1] = Math.random()*10;
      this.siz = 10;
    }
    img.style.left = position[0] - img.width  / 6 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';
    img.style.height = siz + 'px';
    img.style.width = siz + 'px';

    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

var Fire = function(startPos) {
  var fire = this;
  this.position = [startPos[0], startPos[1]];
  var img = document.createElement('img');
  img.src = 'http://icons.iconarchive.com/icons/mcdo-design/cats-2/128/dot-Mac-Logo-icon.png';
  img.style.position = 'absolute';
  img.style.height = "10px";
  img.onload = function () {
    fire.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }

  fire.setTransform = function(position) {
    if(position[0] >= window.innerWidth || position[1] >= window.innerHeight){
      fired = false;
      shots.pop();
    }
    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';

    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};



function crash(position)
{
    var img = document.createElement('img');
    img.src = 'http://ultimatelockdown.com/wp-content/uploads/2015/09/explosion-417894_640.png';
    img.style.position = 'absolute';
    img.style.height = "10%";
    img.style.left = position[0] - img.width / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';
    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;
    document.body.appendChild(img);

}

