console.log("hello beautiful")
import { loadLegos, useLegos } from './legos/LegoData.js'
import { makeLegoList } from './legos/LegoList.js';
import { LegoDetail } from './legos/LegoDetail.js';

const navElement = document.querySelector("nav");

navElement.addEventListener("click", event => {
	if (event.target.id === "search-btn") {
		let searchTerm = document.querySelector("#search-bar").value;
		let legoArr = useLegos();
		let newArr = [];

		for (const eachObj of legoArr) {
			if (eachObj.LegoId === searchTerm) {
				newArr.push(eachObj)
			} else if (eachObj.LegoName.toLowerCase().includes(searchTerm.toLowerCase())) {
				newArr.push(eachObj)
			}
		}

		makeLegoList(newArr)
		
		if (newArr.length === 0) {
			alert("No Results")
		}
		
		
	}
  }
)

// Make "Enter" click the search button///////////////////
const input = document.querySelector("#search-bar");

input.addEventListener("keyup", event => {
	if (event.keyCode === 13) { //keyCode 13 is the enter key
		event.preventDefault();
		document.querySelector("#search-btn").click();
	}
})
//////////////////////////////////////////////////////////

navElement.addEventListener("click", (event) => {
	if (event.target.id === "showBlue") {
		filterLegos("Blue")
	} else if (event.target.id === "showAll") {
		makeLegoList(useLegos())
	} else if (event.target.id === "showRed") {
		filterLegos("Red")
	} else if (event.target.id === "showGreen") {
		filterLegos("Green")
	}
})

navElement.addEventListener("change", event => {
	if (event.target.id === "materials") {
		const matSelect = event.target.options.selectedIndex;

		if (event.target.options[matSelect].value === "All") {
			makeLegoList(useLegos())
		} else {
			filterMat(event.target.options[matSelect].value)
		}
	}
})

const filterMat = (material) => {
	const filtered = useLegos().filter(eachBlock => {
		if (eachBlock.Material === material) {
			return eachBlock
		}
	})

	const legosElement = document.querySelector("#all-legos");
	legosElement.innerHTML = filtered2HTML(filtered)
}

const filtered2HTML = (arr) => {
	let newHTML = '';
	for (const eachObj of arr) {
		newHTML += LegoDetail(eachObj)
	}
	return newHTML
}

const filterLegos = (whatFilter) => {
	const filterArray = useLegos().filter(singleLego => {
		if (singleLego.LegoName.includes(whatFilter)) {
			return singleLego;
		}
	})
	makeLegoList(filterArray);
}


const startEIA = () => {
	loadLegos()
	.then(legoArray => {
		makeLegoList(legoArray)
	})

}

startEIA();