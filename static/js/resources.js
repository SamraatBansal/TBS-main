filterSelection("all");
function filterSelection(c) {
	var x, i;
	x = document.getElementsByClassName("res-card");
	if (c == "all") c = "";
	// Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
	for (i = 0; i < x.length; i++) {
        // x[i].style.display = "block";
        x[i].style.display = 'none';
		// w3RemoveClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) x[i].style.display = "block";
	}
}


function search() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("searchBox");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("res-container");
    cards = cardContainer.getElementsByClassName("res-card");
    var check = false;
    var not_found = document.getElementById("not-found");
    not_found.style.display = "none";
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".res-card-bottom h3");
        author = cards[i].querySelector(".res-card-bottom .author");
        level = cards[i].querySelector(".res-card-bottom .level");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
            check = true;
        } 
        else if(author.innerText.toUpperCase().indexOf(filter) > -1){
            cards[i].style.display = "";
            check = true;

        }
        else if(level.innerText.toUpperCase().indexOf(filter) > -1){
            cards[i].style.display = "";
            check = true;
        }
        else {
            cards[i].style.display = "none";
        }
    }
    if(check==false){
        not_found.style.display = "block";
    }
}


var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btnres");
var not_found = document.getElementById("not-found");
not_found.style.display = "none";
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className	.replace("active","");
		this.className += " active";
	});
}