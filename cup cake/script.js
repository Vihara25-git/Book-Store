// Cake data - can be easily modified or fetched from an API
const cakeData = [
    { item: "Brownie 100g", price: "Rs. 50" },
    { item: "Butter Cake 1kg", price: "Rs. 1000" },
    { item: "Chocolate Cake 1kg", price: "Rs. 1200" },
    { item: "Cheese Cake 1kg", price: "Rs. 1500" },
    { item: "Red Velvet Cake 1kg", price: "Rs. 1600" },
    { item: "Black Forest Cake 1kg", price: "Rs. 1400" },
    { item: "Carrot Cake 1kg", price: "Rs. 1300" },
    { item: "Pineapple Cake 1kg", price: "Rs. 1100" }
];

// DOM Elements
const tableBody = document.getElementById('table-body');
const offerButtons = document.querySelectorAll('.offer-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    populatePriceTable();
    setupEventListeners();
    setupScrollAnimations();
});

// Populate the price list table dynamically
function populatePriceTable() {
    tableBody.innerHTML = ''; // Clear existing content
    
    cakeData.forEach(cake => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${cake.item}</td>
            <td>${cake.price}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Set up event listeners for interactive features
function setupEventListeners() {
    // Special offer buttons click events
    offerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const offerType = this.getAttribute('data-offer');
            handleOfferClick(offerType, this);
        });
    });
    
    // Add click effect to table rows
    tableBody.addEventListener('click', function(e) {
        const row = e.target.closest('tr');
        if (row) {
            highlightRow(row);
        }
    });
}

// Handle offer button clicks
function handleOfferClick(offerType, button) {
    let message = "";
    
    switch(offerType) {
        case "first-order":
            message = "First order discount applied! Use code: TASTY10 at checkout";
            button.textContent = "Offer Claimed!";
            break;
        case "birthday":
            message = "Contact us for birthday cake customization details";
            break;
        case "bulk":
            message = "Our team will contact you shortly with a custom quote";
            break;
        default:
            message = "Thank you for your interest!";
    }
    
    button.disabled = true;
    button.style.backgroundColor = "#ccc";
    button.style.cursor = "not-allowed";
    
    showNotification(message);
}

// Highlight table row on click
function highlightRow(row) {
    // Remove highlight from all rows
    const allRows = document.querySelectorAll('tbody tr');
    allRows.forEach(r => {
        r.style.backgroundColor = '';
    });
    
    // Highlight clicked row
    row.style.backgroundColor = '#e8f4f8';
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
        row.style.backgroundColor = '';
    }, 2000);
}

// Setup scroll animations for cake items
function setupScrollAnimations() {
    const cakeItems = document.querySelectorAll('.cake-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    cakeItems.forEach(item => {
        observer.observe(item);
    });
}

// Utility function to show notifications
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Add CSS for animation if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification {
                animation: slideIn 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.style.animation = 'slideIn 0.3s ease';
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 3000);
}

// Additional feature: Filter cakes by search
function filterCakes(searchTerm) {
    const filteredCakes = cakeData.filter(cake => 
        cake.item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    tableBody.innerHTML = '';
    filteredCakes.forEach(cake => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cake.item}</td>
            <td>${cake.price}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cakeData,
        populatePriceTable,
        filterCakes
    };
}