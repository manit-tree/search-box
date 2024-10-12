import './style.css';

function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

let active_el = null;

export default class SearchBox {
    constructor(inputId, items) {
        this.handlers = [];
        this.container = document.createElement('div');
        this.container.classList.add('search-box-container');
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

        this.container.querySelector('.search-box-results').addEventListener('mousemove', evt => {
            let el = document.elementFromPoint(evt.clientX, evt.clientY);

            if (el.matches('.search-box-result-item') && (el !== active_el)) {
                let current_active = el.parentElement.querySelector('.active');

                if (current_active) {
                    current_active.classList.remove('active');
                }

                active_el = el;
                active_el.classList.add('active');
            }
        })

        this.container.addEventListener('click', evt => {
            let el = evt.target;

            if (el.matches('.search-box-result-item')) {
                evt.preventDefault();

                let a = el.querySelector('a');
                let text = a.innerText;

                this.container.querySelector('.search-box-results')?.classList.remove('show');
                this.inputElement.value = text;

                if (typeof this.handlers['search'] == 'function') {
                    let search_text = this.inputElement.value.trim();

                    if (search_text != '') {
                        this.handlers['search'](search_text);
                    }
                }
            }
        })

        this.inputElement.addEventListener('input', (evt) => {
            this.performSearch()
        })

        this.inputElement.addEventListener('keydown', (evt) => {
            let key = evt.key;
            let el;

            switch (key) {
                case 'Tab':
                    evt.preventDefault();
                    el = this.container.querySelector('.search-box-results.show');

                    if (el) {
                        let active_item = el.querySelector('.search-box-result-item.active');

                        if (!active_item) {
                            el.querySelector('.search-box-result-item')?.classList.add('active');
                        }
                    }

                    break;

                case 'ArrowUp':
                    el = this.container.querySelector('.search-box-results.show');

                    if (el) {
                        let active_item = el.querySelector('.search-box-result-item.active');

                        if (active_item) {
                            if (active_item.previousElementSibling) {
                                active_item.classList.remove('active');                                
                                active_item = active_item.previousElementSibling;

                                if (active_item) {
                                    let top = active_item.offsetTop;
 
                                    if (top < el.scrollTop) {
                                        el.scrollTop = top; 
                                    }

                                    active_item.classList.add('active'); 
                                }
                            }
                        } else {
                            el.classList.remove('show');
                            el.focus();
                        }
                    }

                    break;
                
                case 'ArrowDown':
                    el = this.container.querySelector('.search-box-results.show');

                    if (el) {
                        let active_item = el.querySelector('.search-box-result-item.active');

                        if (active_item) {
                            if (active_item.nextElementSibling) {
                                active_item.classList.remove('active');
                                active_item = active_item.nextElementSibling;

                                if (active_item) {
                                    let top = active_item.offsetTop;
                                    let item_height = active_item.offsetHeight;
                                    let height = el.offsetHeight;


                                    if (top > el.scrollTop + height - 30) {
                                        el.scrollTop = top - (item_height * 6);                                         
                                    }

                                    active_item.classList.add('active');
                                }
                            }
                        } else {
                            active_item = el.querySelector('.search-box-result-item');
                            active_item.classList.add('active');

                            let top = active_item.offsetTop;
                            let item_height = active_item.offsetHeight;

                            el.scrollTop = top - item_height;    
                        }
                    }

                    break;

                case 'Enter':
                    el = this.container.querySelector('.search-box-results.show');

                    if (el) {
                        el.classList.remove('show');
                    }

                    let active_item = this.container.querySelector('.search-box-result-item.active');
                    let input = evt.target;

                    if (active_item) {
                        let a = active_item.querySelector('a');
                        let text = a.innerText;

                        input.value = text;
                        input.focus();
                    }

                    if (typeof this.handlers['search'] == 'function') {
                        let search_text = input.value.trim();

                        if (search_text != '') {
                            this.handlers['search'](search_text);
                        }
                    }

                    break;
            }
        })
    }

    createResultsContainer() {
        const container = document.createElement('div');
        container.className = 'search-box-results';
        this.inputElement.parentElement.appendChild(container);
        return container;
    }

    performSearch() {
        const query = this.inputElement.value.toLowerCase();
        this.resultsContainer.innerHTML = '';

        if (query.length === 0) {
            this.resultsContainer.classList.remove('show');
            return;
        }

        const filteredItems = this.items.filter(item =>
            item.toLowerCase().includes(query)
        )

        filteredItems.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-box-result-item';
            resultItem.innerHTML = `<a href="#">${item}</a>`;
            this.resultsContainer.appendChild(resultItem);
        })

        this.resultsContainer.classList.add('show');
    }

    on(evt, handler) {
        this.handlers[evt] = handler;
    }
}