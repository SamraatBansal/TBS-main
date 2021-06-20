

var hasFired = false;

function scrollAppear() {
	var numDiv = document.getElementById('number1');
	var pos = numDiv.getBoundingClientRect().top;
	var screenPos = window.innerHeight / 1.3;

	// console.log(pos, screenPos);

	if (pos < screenPos && hasFired == false) {
		hasFired = true;
		abc();
	}
}

function abc() {
	var options1 = {
		useEasing: false,
		useGrouping: true,
		separator: "",
		decimal: ".",
		prefix: "",
		suffix: "+",
	};
	
	var options2 = {
		useEasing: false,
		useGrouping: true,
		separator: "",
		decimal: ".",
		prefix: "",
	};
	
	var demo1 = new CountUp("number1", 0, 15000, 0, 1.5, options1);
	var demo2 = new CountUp("number2", 0, 10000, 0, 1.5, options1);
	var demo3 = new CountUp("number3", 0, 30, 0, 1.5, options1);
	var demo4 = new CountUp("number4", 0, 60000, 0, 1.5, options2);
	demo1.start();
	demo2.start();
	demo3.start();
	demo4.start();
}



var glideMulti = new Glide(".multi", {
	type: "carousel",
	autoplay: 5000,
	focusAt: "center",
	perView: 1,
	hoverpause: false,
}).mount();


window.addEventListener("scroll", scrollAppear);
