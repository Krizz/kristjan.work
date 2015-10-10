var blink = false;
var sleeping = true;
var cap = "round";
var strokeStyle = '#555555';

var checkStatus = function() {
  var request = new XMLHttpRequest();
  request.open('GET', '/status', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      var el = document.getElementById('status-text');
      el.textContent = data.status;
    } else {

    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
}

setInterval(checkStatus, 13000);


setInterval(function() {
  blink = true;
}, 5000);
  function init() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    setInterval(function() {
      draw(ctx);
    }, 200);
  }

  function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // layer2/Path
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(49.3, 25.5);
    ctx.bezierCurveTo(49.3, 25.5, -22.2, 64.0, 14.4, 147.5);
    ctx.lineWidth = 8.0;
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = cap;
    ctx.lineJoin = cap;
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(60.3, 39.0);
    ctx.bezierCurveTo(60.3, 39.0, 44.2, 44.3, 32.2, 66.5);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(73.8, 50.0);
    ctx.bezierCurveTo(73.8, 50.0, 29.6, 82.8, 60.3, 125.9);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(64.8, 19.0);
    ctx.bezierCurveTo(64.8, 19.0, 145.6, 95.5, 82.6, 130.5);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(77.8, 11.5);
    ctx.bezierCurveTo(77.8, 11.5, 96.8, 21.3, 115.8, 52.8);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(170.8, 13.3);
    ctx.bezierCurveTo(170.8, 13.3, 151.6, 22.3, 140.6, 37.8);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(185.1, 23.0);
    ctx.bezierCurveTo(185.1, 23.0, 158.9, 40.3, 152.2, 51.8);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(195.7, 35.3);
    ctx.bezierCurveTo(195.7, 35.3, 144.3, 62.0, 166.3, 119.3);
    ctx.bezierCurveTo(188.7, 156.3, 223.1, 105.8, 179.9, 66.5);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(191.3, 52.8);
    ctx.bezierCurveTo(191.3, 52.8, 201.3, 63.0, 211.8, 82.3);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(202.2, 43.0);
    ctx.bezierCurveTo(202.2, 43.0, 282.1, 122.6, 189.8, 208.3);
    ctx.bezierCurveTo(125.1, 265.5, 46.3, 216.3, 46.3, 216.3);
    ctx.bezierCurveTo(46.3, 216.3, 8.8, 196.1, 7.3, 176.2);
    ctx.bezierCurveTo(7.3, 176.2, 5.3, 154.5, 22.9, 136.0);
    ctx.bezierCurveTo(40.6, 117.5, 93.3, 117.3, 129.8, 182.5);
    ctx.bezierCurveTo(164.1, 145.5, 164.3, 59.0, 93.3, 4.0);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(47.7, 179.4);
    ctx.bezierCurveTo(47.7, 183.7, 51.2, 187.2, 55.6, 187.2);
    ctx.bezierCurveTo(57.2, 187.2, 58.7, 186.7, 60.0, 185.9);
    ctx.bezierCurveTo(62.1, 184.5, 63.4, 182.1, 63.4, 179.4);
    ctx.bezierCurveTo(63.4, 175.0, 59.9, 171.5, 55.6, 171.5);
    ctx.bezierCurveTo(51.2, 171.5, 47.7, 175.0, 47.7, 179.4);
    ctx.closePath();
    ctx.lineWidth = 7.0;
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(70.1, 165.9);
    ctx.bezierCurveTo(70.1, 171.0, 74.3, 175.2, 79.4, 175.2);
    ctx.bezierCurveTo(81.3, 175.2, 83.1, 174.6, 84.6, 173.6);
    ctx.bezierCurveTo(87.1, 171.9, 88.7, 169.1, 88.7, 165.9);
    ctx.bezierCurveTo(88.7, 160.7, 84.5, 156.6, 79.4, 156.6);
    ctx.bezierCurveTo(74.3, 156.6, 70.1, 160.7, 70.1, 165.9);
    ctx.closePath();
    ctx.lineWidth = 8.0;
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(22.9, 165.9);
    ctx.bezierCurveTo(22.9, 171.0, 27.1, 175.2, 32.2, 175.2);
    ctx.bezierCurveTo(34.2, 175.2, 36.0, 174.6, 37.4, 173.6);
    ctx.bezierCurveTo(39.9, 171.9, 41.5, 169.1, 41.5, 165.9);
    ctx.bezierCurveTo(41.5, 160.7, 37.4, 156.6, 32.2, 156.6);
    ctx.bezierCurveTo(27.1, 156.6, 22.9, 160.7, 22.9, 165.9);
    ctx.closePath();
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(72.6, 196.8);
    ctx.lineWidth = 9.0;
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(39.6, 196.8);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(87.5, 161.4);
    ctx.lineTo(102.4, 182.0);
    ctx.lineWidth = 8.0;
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(24.1, 161.3);
    ctx.lineTo(12.2, 183.8);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(10.1, 157.5);
    ctx.bezierCurveTo(10.1, 157.5, 28.3, 131.0, 55.6, 152.3);
    ctx.bezierCurveTo(68.8, 141.3, 80.2, 138.3, 101.2, 146.0);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(66.3, 222.9);
    ctx.bezierCurveTo(66.3, 222.9, 95.3, 201.7, 95.9, 200.3);
    ctx.bezierCurveTo(95.9, 186.3, 76.1, 174.6, 76.1, 174.6);
    ctx.stroke();

    // layer2/Path
    ctx.beginPath();
    ctx.moveTo(28.7, 204.9);
    ctx.bezierCurveTo(28.7, 204.9, 22.8, 191.5, 34.3, 175.2);
    ctx.stroke();
    ctx.restore();

    // layer3/Path
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(39.1, 198.8);
    ctx.lineTo(72.1, 198.8);
    ctx.lineWidth = 9.0;
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = cap;
    ctx.lineJoin = cap;
    ctx.stroke();
    ctx.restore();

    if (blink) {
          blink = false;
         // bLINK/Path
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(75.8, 165.9);
         ctx.bezierCurveTo(75.8, 167.9, 77.4, 169.5, 79.4, 169.5);
         ctx.bezierCurveTo(80.1, 169.5, 80.8, 169.3, 81.4, 168.9);
         ctx.bezierCurveTo(82.3, 168.2, 82.9, 167.1, 82.9, 165.9);
         ctx.bezierCurveTo(82.9, 163.9, 81.3, 162.3, 79.4, 162.3);
         ctx.bezierCurveTo(77.4, 162.3, 75.8, 163.9, 75.8, 165.9);
         ctx.closePath();
         ctx.lineWidth = 8.0;
         ctx.strokeStyle = strokeStyle;
         ctx.lineCap = cap;
         ctx.lineJoin = cap;
         ctx.stroke();

         // bLINK/Path
         ctx.beginPath();
         ctx.moveTo(28.6, 165.9);
         ctx.bezierCurveTo(28.6, 167.9, 30.3, 169.5, 32.2, 169.5);
         ctx.bezierCurveTo(33.0, 169.5, 33.7, 169.3, 34.3, 168.9);
         ctx.bezierCurveTo(35.2, 168.2, 35.8, 167.1, 35.8, 165.9);
         ctx.bezierCurveTo(35.8, 163.9, 34.2, 162.3, 32.2, 162.3);
         ctx.bezierCurveTo(30.3, 162.3, 28.6, 163.9, 28.6, 165.9);
         ctx.closePath();
         ctx.stroke();
         ctx.restore();
    }

  }

  $('.center').on('click', function() {
    $('body').addClass('full-monkey');
    var audio = $('audio').get(0);
    var video = $('video').get(0);

    audio.currentTime = 70.5
    video.currentTime = 20
    video.playbackRate = 1
    setInterval(function() {
      if (video.currentTime > 21 && audio.currentTime < 75) {
        video.currentTime = 20;
      }
    }, 500)

    audio.play();
  });

  init();