
document.getScroll = function () {
  if (window.pageYOffset != undefined) {
    return [pageXOffset, pageYOffset];
  } else {
    var sx, sy, d = document,
      r = d.documentElement,
      b = d.body;
    sx = r.scrollLeft || b.scrollLeft || 0;
    sy = r.scrollTop || b.scrollTop || 0;
    return [sx, sy];
  }
}

function animateTitles(name) {

  setTimeout(function () {
    var currentVideo = document.getElementById(name);
    currentVideo.classList.remove("fade-out");
    currentVideo.classList.add("fade-in");
    setTimeout(function () {
      currentVideo.classList.remove("fade-in");
      currentVideo.classList.add("fade-out");
    }, 3000);
  }, 3000);
}

var dogVideo = document.getElementById("dogVideo");
window.addEventListener("scroll", function (e) {
  var limit = Math.max(document.body.scrollWidth, document.body.offsetWidth,
    document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
  var maxWidth = limit - window.innerWidth;
  var currentWidth = document.getScroll()[0];

  if (currentWidth == 0) {
    window.scrollTo(maxWidth - 1, 0);
  };

  if (currentWidth == maxWidth) {
    window.scrollTo(0, 0);
  };
});

function scrollHorizontally(e) {
  e = window.event || e;
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  var scrollSpeed = 30; // Janky jank <<<<<<<<<<<<<<
  document.documentElement.scrollLeft -= (delta * scrollSpeed);
  document.body.scrollLeft -= (delta * scrollSpeed);
  e.preventDefault();
}

if (window.addEventListener) {
  // IE9, Chrome, Safari, Opera
  window.addEventListener("mousewheel", scrollHorizontally, false);
  // Firefox
  window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
} else {
  // IE 6/7/8
  window.attachEvent("onmousewheel", scrollHorizontally);
}

var maximalSpeed = 2;
var isVideoPlay = false;


var playbackChange = 0.1;

function scrollSpeed(e) {
  if (!isVideoPlay) {
    dogVideo.playbackRate = 0.1;
    dogVideo.play();
    isVideoPlay = true;
  }

  e = window.event || e;
  dogVideo.playbackRate = Math.min(dogVideo.playbackRate + playbackChange, maximalSpeed);
  prevPos = document.getScroll();
}

if (window.addEventListener) {
  // IE9, Chrome, Safari, Opera
  window.addEventListener("mousewheel", scrollSpeed, false);
  // Firefox
  window.addEventListener("DOMMouseScroll", scrollSpeed, false);
} else {
  // IE 6/7/8
  window.attachEvent("onmousewheel", scrollSpeed);
}

var slowFactor = 5 * playbackChange;
var prevPos = document.getScroll();
window.setInterval(function () {
  var curPos = document.getScroll();
  if (prevPos[0] == curPos[0]) {
    if (isVideoPlay) {
      if (dogVideo.playbackRate - slowFactor <= 0) {
        isVideoPlay = false;
        dogVideo.pause();
      }
      dogVideo.playbackRate = Math.max(dogVideo.playbackRate - slowFactor, 0);
    }
  }
}, 300);