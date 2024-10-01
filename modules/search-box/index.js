import './style.css';

function update_ul(ul, arr) {
    let sb = new Array();

    arr.forEach(item => {
        sb.push('<li>' + item + '</li>');
    })

    ul.innerHTML = sb.join('');
    
    if (ul.firstChild) {
        ul.firstChild.classList.add('active');
    }
}

function search_box(el, arr = []) {
    let search_box = $.el('<div class="search-box"></div>');
    let ul = $.el('<ul></ul>');
    let textbox = el;

    let on_keydown = (evt) => {
        if (evt.key == 'ArrowDown') {
            let active_li = ul.querySelector('li.active');

            if (active_li) {
                if (active_li.nextElementSibling) {
                    active_li.classList.remove('active');
                    active_li.nextElementSibling.classList.add('active');
                }
            }

            return
        } else if (evt.key == 'ArrowUp') {
            let active_li = ul.querySelector('li.active');

            if (active_li) {
                if (active_li.previousElementSibling) {
                    active_li.classList.remove('active');
                    active_li.previousElementSibling.classList.add('active');
                }
            }

            return            
        } else if (evt.key == 'Enter') {
            evt.preventDefault();

            let active_li = ul.querySelector('li.active');

            if (active_li) {
                textbox.value = active_li.innerText;
                ul.innerHTML = '';
            }

            return;
        } else if (evt.key == 'Escape') {
            evt.preventDefault();
            ul.innerHTML = '';
            return;
        }

        let text = textbox.value;

        let res = arr.filter(item => {
            return item.includes(text);
        })

        update_ul(ul, res);
    }

    search_box.addEventListener('click', evt => {
        let el = evt.target;

        if (el.matches('li')) {
            textbox.value = el.innerText;
            ul.innerHTML = '';
        }
    })

    arr.sort();
    
    $.wrap(el, search_box);
    search_box.append(ul);

    el.addEventListener('keydown', on_keydown);
}

export default search_box;