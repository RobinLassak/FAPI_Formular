// Objednávkový systém - JavaScript funkcionalita

// Metoda 1: Přenos dat z formuláře na thank-you stránku
function transferFormData() {
    // Získání dat z URL parametrů
    const urlParams = new URLSearchParams(window.location.search);
    
    // Načtení dat z localStorage (pokud existují)
    const formData = JSON.parse(localStorage.getItem('orderData') || '{}');
    
    // Naplnění polí na thank-you stránce
    if (document.getElementById('customer-name')) {
        document.getElementById('customer-name').textContent = formData.name || '-';
        document.getElementById('customer-email').textContent = formData.email || '-';
        document.getElementById('customer-phone').textContent = formData.phone || '-';
        document.getElementById('product-name').textContent = getProductName(formData.product) || '-';
        document.getElementById('quantity').textContent = formData.quantity || '-';
        
        // Výpočet cen
        calculatePrices(formData.product, formData.quantity);
    }
}

// Metoda 2: Přepnutí na thank-you stránku s daty
function switchToThankYou(formData) {
    // Uložení dat do localStorage
    localStorage.setItem('orderData', JSON.stringify(formData));
    
    // Přepnutí na thank-you stránku
    window.location.href = 'thank-you.html';
}

// Pomocné funkce
function getProductName(productValue) {
    const products = {
        '100': 'Produkt 1 - 100 Kč',
        '200': 'Produkt 2 - 200 Kč',
        '300': 'Produkt 3 - 300 Kč'
    };
    return products[productValue] || '-';
}

function calculatePrices(productPrice, quantity) {
    const price = parseInt(productPrice) || 0;
    const qty = parseInt(quantity) || 0;
    const totalWithoutVat = price * qty;
    const vat = totalWithoutVat * 0.21; // 21% DPH
    const totalWithVat = totalWithoutVat + vat;
    const priceEur = totalWithVat / 25; // Kurz 1 EUR = 25 Kč
    
    // Aktualizace cen na stránce
    document.getElementById('price-without-vat').textContent = totalWithoutVat + ' Kč';
    document.getElementById('vat-amount').textContent = Math.round(vat) + ' Kč';
    document.getElementById('total-price-vat').textContent = Math.round(totalWithVat) + ' Kč';
    document.getElementById('price-eur').textContent = priceEur.toFixed(2) + ' EUR';
}

// Výpočet celkové ceny na hlavním formuláři
function calculateTotalPrice() {
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const totalPriceElement = document.getElementById('total-price');
    
    if (productSelect && quantityInput && totalPriceElement) {
        const price = parseInt(productSelect.value) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const total = price * quantity;
        
        totalPriceElement.textContent = 'Celková cena: ' + total + ' Kč';
    }
}

// Event listeners pro hlavní formulář
document.addEventListener('DOMContentLoaded', function() {
    // Inicializace na thank-you stránce
    if (window.location.pathname.includes('thank-you.html')) {
        transferFormData();
    }
    
    // Event listeners pro hlavní formulář
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    const orderForm = document.getElementById('orderForm');
    
    if (productSelect) {
        productSelect.addEventListener('change', calculateTotalPrice);
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('input', calculateTotalPrice);
    }
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Získání dat z formuláře
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                product: document.getElementById('product').value,
                quantity: document.getElementById('quantity').value
            };
            
            // Přepnutí na thank-you stránku
            switchToThankYou(formData);
        });
    }
    
    // Inicializace celkové ceny
    calculateTotalPrice();
});
