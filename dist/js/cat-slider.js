const modalButton       = document.querySelector('.modal-exit--action');
const modalContainer    = document.querySelector('.modal-bg'); 

class LongcatRange {
	constructor(qs,isDark) {
		this.el = document.querySelector(qs);
		this.sr = null;
		this.fill = null;
		this.value = null;

		if (this.el) {
			this.buildSlider(isDark);
			this.el.addEventListener("input",this.changeValue.bind(this));
		}
	}
	buildSlider(isDark) {
		this.el.className = "longcat__input";
		// create a div to contain the <input> and screen reader label
		let rangeWrap = document.createElement("div");
		rangeWrap.className = "longcat";
		rangeWrap.classList.add(`longcat--${isDark === true ? "dark" : "light"}`);
		this.el.parentElement.insertBefore(rangeWrap,this.el);
		// screen reader label
		this.sr = document.querySelector(`[for='${this.el.id}']`);
		if (this.sr) {
			this.sr.className = "longcat__sr";
			rangeWrap.appendChild(this.sr);
		}
		// input after screen reader label
		rangeWrap.appendChild(this.el);
		// range fill
		let rangeFill = document.createElement("span");
		rangeFill.className = "longcat__torso";
		rangeWrap.appendChild(rangeFill);
		// range value
		let rangeValue = document.createElement("span");
		rangeValue.className = "longcat__value";
		rangeValue.textContent = this.el.value;
		rangeWrap.appendChild(rangeValue);
		// initial value
		this.fill = rangeFill;
		this.value = rangeValue;
		this.changeValue();
	}
	changeValue() {
		// keep the value within range
		if (+this.el.value > this.el.max)
			this.el.value = this.el.max;
		else if (+this.el.value < this.el.min)
			this.el.value = this.el.min;
		// width of fill
		if (this.fill) {
			let pct = (this.el.value - this.el.min) / (this.el.max - this.el.min),
				fillWidth = pct * 100,
				thumbEm = 1,
				thumbEmPct = thumbEm * pct;

			this.fill.style.width = `calc(${fillWidth}% - ${thumbEmPct}em)`;
		}
		// value
		if (this.value)
			this.value.textContent = this.el.value;

		if (this.value.textContent == 100) {
			modalContainer.classList.add('modal-bg-active');
		}
	}
}



document.addEventListener("DOMContentLoaded", function() {
	let  tacgnol2 = new LongcatRange("#tacgnol2", true);
});

modalContainer.addEventListener('click', () => {
	modalContainer.classList.remove('modal-bg-active');
});