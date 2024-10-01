(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode('.search-box {\n  font-size: 16px;\n  position: relative;\n}\n\n.search-box input[type="text"] {\n  box-sizing: border-box;\n  outline: 1px solid var(--outline-color);\n  border: 0;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  width: 100%;\n  padding: .65em .75em;\n  font-size: 1em;\n}\n\n.search-box input[type="text"]:has( + ul:empty) {\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n\n.search-box ul {\n  outline: 1px solid var(--outline-color);\n  -webkit-user-select: none;\n  user-select: none;\n  border-bottom-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n  flex-direction: column;\n  gap: .25em;\n  max-height: 22.2ch;\n  padding: .75em .65em;\n  list-style: none;\n  display: flex;\n  position: relative;\n  overflow: scroll;\n}\n\n.search-box ul:empty {\n  display: none;\n}\n\n.search-box ul li.active {\n  color: red;\n}'));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
var search_box = function() {
  "use strict";
  function update_ul(ul, arr) {
    let sb = new Array();
    arr.forEach((item) => {
      sb.push("<li>" + item + "</li>");
    });
    ul.innerHTML = sb.join("");
    if (ul.firstChild) {
      ul.firstChild.classList.add("active");
    }
  }
  function search_box2(el, arr = []) {
    let search_box3 = $.el('<div class="search-box"></div>');
    let ul = $.el("<ul></ul>");
    let textbox = el;
    let on_keydown = (evt) => {
      console.log("key: " + evt.key);
      if (evt.key == "ArrowDown") {
        let active_li = ul.querySelector("li.active");
        if (active_li) {
          console.log("xxx");
          if (active_li.nextElementSibling) {
            active_li.classList.remove("active");
            active_li.nextElementSibling.classList.add("active");
          }
        }
        return;
      } else if (evt.key == "ArrowUp") {
        let active_li = ul.querySelector("li.active");
        if (active_li) {
          if (active_li.previousElementSibling) {
            active_li.classList.remove("active");
            active_li.previousElementSibling.classList.add("active");
          }
        }
        return;
      } else if (evt.key == "Enter") {
        evt.preventDefault();
        let active_li = ul.querySelector("li.active");
        if (active_li) {
          textbox.value = active_li.innerText;
          ul.innerHTML = "";
        }
        return;
      } else if (evt.key == "Escape") {
        console.log("zzzzzzz");
        evt.preventDefault();
        ul.innerHTML = "";
        return;
      }
      let text = textbox.value;
      let res = arr.filter((item) => {
        return item.includes(text);
      });
      update_ul(ul, res);
    };
    search_box3.addEventListener("click", (evt) => {
      let el2 = evt.target;
      if (el2.matches("li")) {
        textbox.value = el2.innerText;
        ul.innerHTML = "";
      }
    });
    arr.sort();
    $.wrap(el, search_box3);
    search_box3.append(ul);
    el.addEventListener("keydown", on_keydown);
  }
  return search_box2;
}();
