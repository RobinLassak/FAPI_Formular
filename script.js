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

// Validace formuláře
function validateForm(formData) {
    let isValid = true;
    let errorMessage = '';
    
    // Validace jména
    if (!formData.name || formData.name.length < 2) {
        errorMessage += 'Jméno musí mít alespoň 2 znaky.\n';
        isValid = false;
    }
    
    // Validace emailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errorMessage += 'Zadejte platný email.\n';
        isValid = false;
    }
    
    // Validace telefonu
    const phoneRegex = /^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        errorMessage += 'Zadejte platný telefon ve formátu +420 123 456 789 nebo 123 456 789.\n';
        isValid = false;
    }
    
    // Validace produktu
    if (!formData.product) {
        errorMessage += 'Vyberte produkt.\n';
        isValid = false;
    }
    
    // Validace množství
    const quantity = parseInt(formData.quantity);
    if (!quantity || quantity < 1 || quantity > 100) {
        errorMessage += 'Množství musí být mezi 1 a 100 kusy.\n';
        isValid = false;
    }
    
    // Zobrazení chybové zprávy
    if (!isValid) {
        alert('Opravte následující chyby:\n\n' + errorMessage);
    }
    
    return isValid;
}

// Validace jednotlivých polí
function validateField(fieldName, value) {
    const field = document.getElementById(fieldName);
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'name':
            if (!value || value.length < 2) {
                errorMessage = 'Jméno musí mít alespoň 2 znaky';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                errorMessage = 'Zadejte platný email';
                isValid = false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^(\+420\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/;
            if (!value || !phoneRegex.test(value.replace(/\s/g, ''))) {
                errorMessage = 'Zadejte platný telefon';
                isValid = false;
            }
            break;
            
        case 'quantity':
            const quantity = parseInt(value);
            if (!quantity || quantity < 1 || quantity > 100) {
                errorMessage = 'Množství musí být mezi 1 a 100';
                isValid = false;
            }
            break;
    }
    
    // Zobrazení/skrytí chybové zprávy
    showFieldError(field, errorMessage, isValid);
    
    return isValid;
}

// Zobrazení chybové zprávy pro pole
function showFieldError(field, message, isValid) {
    // Odstranění existující chybové zprávy
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Odstranění chybové třídy
    field.classList.remove('error');
    
    if (!isValid) {
        // Přidání chybové třídy
        field.classList.add('error');
        
        // Vytvoření chybové zprávy
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        
        // Vložení chybové zprávy za pole
        field.parentNode.appendChild(errorDiv);
    }
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
        // Real-time validace
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const quantityInput = document.getElementById('quantity');
        
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                validateField('name', this.value.trim());
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                validateField('email', this.value.trim());
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                validateField('phone', this.value.trim());
            });
        }
        
        if (quantityInput) {
            quantityInput.addEventListener('blur', function() {
                validateField('quantity', this.value);
            });
        }
        
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Získání dat z formuláře
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                product: document.getElementById('product').value,
                quantity: document.getElementById('quantity').value
            };
            
            // Validace formuláře
            if (validateForm(formData)) {
                // Přepnutí na thank-you stránku
                switchToThankYou(formData);
            }
        });
    }
    
    // Inicializace celkové ceny
    calculateTotalPrice();
});
