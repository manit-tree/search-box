(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode('.search-box-container {\n  width: 100%;\n  position: relative;\n}\n\n.search-box-container input[type="text"] {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 8px 16px;\n  font-family: inherit;\n}\n\n.search-box-container input[type="text"]:focus-visible {\n  outline: 0;\n}\n\n.search-box-results {\n  z-index: 1000;\n  opacity: 0;\n  transform-origin: top;\n  scrollbar-width: thin;\n  scrollbar-color: #ccc #fff;\n  background: #fff;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  width: 100%;\n  max-height: 342px;\n  transition: opacity .3s, transform .3s;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  overflow: hidden auto;\n  transform: scaleY(0);\n  box-shadow: 0 4px 8px #0003;\n}\n\n.search-box-results.show {\n  opacity: 1;\n  transform: scaleY(1);\n}\n\n.search-box-result-item {\n  cursor: pointer;\n  border-bottom: 1px solid #eee;\n  align-items: center;\n  padding: 12px 16px;\n  transition: background-color .3s, transform .3s;\n  display: flex;\n}\n\n.search-box-result-item.active {\n  background-color: #f3f3f3;\n}\n\n._search-box-result-item:hover {\n  background-color: #f0f0f0;\n  transform: translateX(5px);\n}\n\n.search-box-result-item a {\n  color: #333;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n  font-weight: 600;\n  text-decoration: none;\n}\n\n._search-box-result-item a:hover {\n  text-decoration: underline;\n}\n\n.search-box-results::-webkit-scrollbar {\n  width: 8px;\n}\n\n.search-box-results::-webkit-scrollbar-track {\n  background: #fff;\n}\n\n.search-box-results::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 10px;\n}'));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
var SearchBox = function() {
  "use strict";
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  let active_el = null;
  class SearchBox2 {
    constructor(inputId, items) {
      this.handlers = [];
      this.container = document.createElement("div");
      this.container.classList.add("search-box-container");
      this.inputElement = document.getElementById(inputId);
      wrap(this.inputElement, this.container);
      this.items = items;
      this.resultsContainer = this.createResultsContainer();
      this.init();
    }
    init() {
      if (!this.inputElement) {
        console.error(`Input element with id ${this.inputElement.id} not found.`);
        return;
      }
      if (Array.isArray(this.items)) {
        this.items = [...new Set(this.items)];
        this.items.sort();
      }
      this.container.querySelector(".search-box-results").addEventListener("mousemove", (evt) => {
        let el = document.elementFromPoint(evt.clientX, evt.clientY);
        if (el.matches(".search-box-result-item") && el !== active_el) {
          let current_active = el.parentElement.querySelector(".active");
          if (current_active) {
            current_active.classList.remove("active");
          }
          active_el = el;
          active_el.classList.add("active");
        }
      });
      this.container.addEventListener("click", (evt) => {
        var _a;
        let el = evt.target;
        if (el.matches(".search-box-result-item")) {
          evt.preventDefault();
          let a = el.querySelector("a");
          let text = a.innerText;
          (_a = this.container.querySelector(".search-box-results")) == null ? void 0 : _a.classList.remove("show");
          this.inputElement.value = text;
          if (typeof this.handlers["search"] == "function") {
            let search_text = this.inputElement.value.trim();
            if (search_text != "") {
              this.handlers["search"](search_text);
            }
          }
        }
      });
      this.inputElement.addEventListener("input", (evt) => {
        this.performSearch();
      });
      this.inputElement.addEventListener("keydown", (evt) => {
        var _a;
        let key = evt.key;
        let el;
        switch (key) {
          case "Tab":
            evt.preventDefault();
            el = this.container.querySelector(".search-box-results.show");
            if (el) {
              let active_item2 = el.querySelector(".search-box-result-item.active");
              if (!active_item2) {
                (_a = el.querySelector(".search-box-result-item")) == null ? void 0 : _a.classList.add("active");
              }
            }
            break;
          case "ArrowUp":
            el = this.container.querySelector(".search-box-results.show");
            if (el) {
              let active_item2 = el.querySelector(".search-box-result-item.active");
              if (active_item2) {
                if (active_item2.previousElementSibling) {
                  active_item2.classList.remove("active");
                  active_item2 = active_item2.previousElementSibling;
                  if (active_item2) {
                    let top = active_item2.offsetTop;
                    if (top < el.scrollTop) {
                      el.scrollTop = top;
                    }
                    active_item2.classList.add("active");
                  }
                }
              } else {
                el.classList.remove("show");
                el.focus();
              }
            }
            break;
          case "ArrowDown":
            el = this.container.querySelector(".search-box-results.show");
            if (el) {
              let active_item2 = el.querySelector(".search-box-result-item.active");
              if (active_item2) {
                if (active_item2.nextElementSibling) {
                  active_item2.classList.remove("active");
                  active_item2 = active_item2.nextElementSibling;
                  if (active_item2) {
                    let top = active_item2.offsetTop;
                    let item_height = active_item2.offsetHeight;
                    let height = el.offsetHeight;
                    if (top > el.scrollTop + height - 30) {
                      el.scrollTop = top - item_height * 6;
                    }
                    active_item2.classList.add("active");
                  }
                }
              } else {
                active_item2 = el.querySelector(".search-box-result-item");
                active_item2.classList.add("active");
                let top = active_item2.offsetTop;
                let item_height = active_item2.offsetHeight;
                el.scrollTop = top - item_height;
              }
            }
            break;
          case "Enter":
            el = this.container.querySelector(".search-box-results.show");
            if (el) {
              el.classList.remove("show");
            }
            let active_item = this.container.querySelector(".search-box-result-item.active");
            let input = evt.target;
            if (active_item) {
              let a = active_item.querySelector("a");
              let text = a.innerText;
              input.value = text;
              input.focus();
            }
            if (typeof this.handlers["search"] == "function") {
              let search_text = input.value.trim();
              if (search_text != "") {
                this.handlers["search"](search_text);
              }
            }
            break;
        }
      });
    }
    createResultsContainer() {
      const container = document.createElement("div");
      container.className = "search-box-results";
      this.inputElement.parentElement.appendChild(container);
      return container;
    }
    performSearch() {
      const query = this.inputElement.value.toLowerCase();
      this.resultsContainer.innerHTML = "";
      if (query.length === 0) {
        this.resultsContainer.classList.remove("show");
        return;
      }
      const filteredItems = this.items.filter(
        (item) => item.toLowerCase().includes(query)
      );
      filteredItems.forEach((item) => {
        const resultItem = document.createElement("div");
        resultItem.className = "search-box-result-item";
        resultItem.innerHTML = `<a href="#">${item}</a>`;
        this.resultsContainer.appendChild(resultItem);
      });
      this.resultsContainer.classList.add("show");
    }
    on(evt, handler) {
      this.handlers[evt] = handler;
    }
  }
  return SearchBox2;
}();
