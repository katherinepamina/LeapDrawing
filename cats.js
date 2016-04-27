var ships = {};
var cats = {};

Leap.loop(function(frame) {

  frame.hands.forEach(function(hand, index) {

    var ship = ( ships[index] || (ships[index] = new SpaceShip()) );
    ship.setTransform(hand.screenPosition(), hand.roll());

    for(var i = 0; i < 10; i++){
      var cat = (cats[i] || (cats[i] = new Cat()));
      var pos = hand.screenPosition();
      if(Math.abs(cat.position[0]-pos[0]) < 20 && Math.abs(cat.position[1]-pos[1]) < 20){
        console.log("Crash");
        return;
      }
      cat.position[0] += 5;
      cat.position[1] += 5;
      cat.setTransform([cat.position[0], cat.position[1]]);
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
  this.position = [Math.random()*window.innerWidth, Math.random()*window.innerHeight];
  var img = document.createElement('img');
  img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/109794/cat_2.png';
  img.style.position = 'absolute';
  img.style.height = "10%";
  img.onload = function () {
    cat.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }

  cat.setTransform = function(position) {
    if(position[0] >= window.innerWidth || position[1] >= window.innerHeight){
      this.position[0] = Math.random()*window.innerWidth;
      this.position[1] = Math.random()*window.innerHeight;
    }
    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';


    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

