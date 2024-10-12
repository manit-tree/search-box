import './style.css';

class SearchBox {
    constructor(inputId, items) {
        this.inputElement = document.getElementById(inputId);
        this.items = items;
        this.resultsContainer = this.createResultsContainer();
        this.init();
    }

    init() {
        if (!this.inputElement) {
            console.error(`Input element with id ${this.inputElement.id} not found.`);
            return;
        }

        console.log('aaaa');

        if (Array.isArray(this.items)) {
            this.items.sort();

            console.log('vvvv');
        }

        this.inputElement.addEventListener('input', () => this.performSearch());
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
            item.itemName.toLowerCase().includes(query)
        );

        filteredItems.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-box-result-item';
            resultItem.innerHTML = `<a href="${item.link}">${item.itemName}</a>`;
            this.resultsContainer.appendChild(resultItem);
        });

        this.resultsContainer.classList.add('show');
    }
}