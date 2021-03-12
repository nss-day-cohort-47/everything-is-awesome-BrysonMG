console.log("hello beautiful")
import { loadLegos, useLegos } from './legos/LegoData.js'
import { makeLegoList } from './legos/LegoList.js';
import { LegoDetail } from './legos/LegoDetail.js';

const navElement = document.querySelector("nav");

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