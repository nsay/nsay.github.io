const body = document.body

const btnTheme = document.querySelector('.fa-sun')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

  addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)


/* FIREFLY */
function firefly(id, num, sz, color) {
	if (document.getElementById("fireflyLayer") != null) {
	  var canvas = document.getElementById("fireflyLayer");
	} else {
	  var canvas = document.createElement('canvas');
	  div = document.getElementById(id);
	  canvas.id = "fireflyLayer";
	  canvas.height = div.offsetHeight;
	  canvas.width = div.offsetWidth;
	  canvas.style.position = "absolute";
	  canvas.style.zIndex = -100;
	  canvas.style.left = "0";
	  canvas.style.top = "0";
	  div.appendChild(canvas);
	}
	var h = canvas.height;
	var w = canvas.width;
	sketch(num, sz, color, h, w);
  }
  
  function sketch(num, sz, color, h, w) {
	var mainCanvas = document.getElementById("fireflyLayer");
	var mainContext = mainCanvas.getContext('2d');
	mainContext.clearRect(0, 0, w, h);
  
	var circles = new Array();
  
	var requestAnimationFrame = window.requestAnimationFrame ||
	  window.mozRequestAnimationFrame ||
	  window.webkitRequestAnimationFrame ||
	  window.msRequestAnimationFrame;
  
	function Circle(radius, speed, width, xPos, yPos) {
	  this.radius = radius;
	  this.speed = speed;
	  this.width = width;
	  this.xPos = xPos;
	  this.yPos = yPos;
	  this.opacity = .05 + Math.random() * .8;
  
	  this.counter = 0;
  
	  var signHelper = Math.floor(Math.random() * 2);
  
	  if (signHelper == 1) {
		this.sign = -1;
	  } else {
		this.sign = 1;
	  }
	}
  
	Circle.prototype.update = function () {
	  this.counter += this.sign * this.speed;
  
	  mainContext.beginPath();
  
	  mainContext.arc(this.xPos + Math.cos(this.counter / w) * this.radius,
		this.yPos + Math.sin(this.counter / h) * this.radius,
		this.width,
		0,
		Math.PI * 2,
		false);
  
	  mainContext.closePath();
  
	  var hex = color.replace('#', '');
	  var r = parseInt(hex.substring(0, 2), 16);
	  var g = parseInt(hex.substring(2, 4), 16);
	  var b = parseInt(hex.substring(4, 6), 16);
	  mainContext.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + this.opacity + ')';
	  mainContext.fill();
	};
  
	var szNum;
	if (sz == "big") { szNum = 10; }
	else if (sz == "medium") { szNum = 5; }
	else if (sz == "small") { szNum = 3; }
	else if (sz == "tiny") { szNum = 1; }
	else { szNum = 5; }
  
	function drawCircles() {
	  for (var i = 0; i < num; i++) {
		var randomX = Math.round(Math.random() * w);
		var randomY = Math.round(Math.random() * h);
		var speed = .2 + Math.random() * 3;
		var size = Math.random() * szNum;
  
		var circle = new Circle(100, speed, size, randomX, randomY);
  
		circles[i] = circle;
	  }
	  draw();
	}
	drawCircles();
  
	function draw() {
	  mainContext.clearRect(0, 0, w, h);
  
	  for (var i = 0; i < circles.length; i++) {
		var myCircle = circles[i];
		myCircle.update();
	  }
	  requestAnimationFrame(draw);
	}
  };
  
  window.onload = function () {
	firefly("top", 500, "small", "#cdcdff");
  };