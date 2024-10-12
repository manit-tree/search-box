import SearchBox from './modules/search-box/index.js';

const items = [
    "Toyota Camry",
    "Honda Civic",
    "Ford F-150",
    "Chevrolet Silverado",
    "Brake Pads",
    "Air Filter",
    "Oil Filter",
    "Alternator",
    "Car Cover",
    "Dashboard Camera",
    "Seat Covers",
    "Floor Mats",
    "Oil Change Service",
    "Tire Rotation",
    "Brake Inspection",
    "Engine Diagnostic",
    "Winter Tire Sale",
    "Oil Change Discount",
    "Free Brake Inspection",
    "Buy 1 Get 1 Free Accessories",
    "Bosch",
    "Denso",
    "Michelin",
    "Goodyear",
    "Sedans",
    "SUVs",
    "Trucks",
    "Hybrids",
    "New York Store",
    "Los Angeles Store",
    "Chicago Store",
    "Houston Store",
    "Headlight Bulbs",
    "Windshield Wipers",
    "Battery",
    "Transmission Fluid"
]

document.addEventListener('DOMContentLoaded', () => {
    let search_box = new SearchBox('search-box', items);

    search_box.on('search', search_text => {
        console.log(search_text);
    })    
})
