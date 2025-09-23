// Agricultural Website with Complete Farmer Authentication System
// Updated for full compatibility with HTML structure

// Agricultural data with comprehensive information
const agriculturalData = {
    agriculturalProblems: [
        {
            problem: "Climate Change & Environmental Degradation",
            description: "Unpredictable weather patterns, drought, hail, waterlogging, and temperature extremes reduce crop yields",
            solution: "Climate-resilient farming with drought-tolerant varieties, conservation agriculture, satellite monitoring",
            impactReduction: "35% yield stability increase",
            technology: "Satellite monitoring, conservation agriculture"
        },
        {
            problem: "Soil Degradation & Erosion",
            description: "Loss of arable land due to erosion, salinization, nutrient depletion reducing crop vigor",
            solution: "Contour plowing, terracing, cover cropping, crop rotation, agroforestry",
            impactReduction: "40% erosion reduction", 
            technology: "Soil moisture monitoring, satellite imagery"
        },
        {
            problem: "Water Scarcity & Mismanagement",
            description: "Inefficient irrigation, dwindling groundwater, over-reliance on monsoon rains",
            solution: "Precision irrigation, drip systems, rainwater harvesting, soil moisture sensors",
            impactReduction: "50% water savings",
            technology: "IoT sensors, precision irrigation"
        },
        {
            problem: "Pest & Disease Management",
            description: "Pests and diseases devastate crops, excessive pesticide use harms environment",
            solution: "Integrated Pest Management (IPM), biological control, disease-resistant varieties",
            impactReduction: "25% pesticide reduction",
            technology: "Remote sensing, AI-based disease prediction"
        },
        {
            problem: "Labor Shortages & Aging Workforce",
            description: "Lack of skilled workers, aging population, rising labor costs",
            solution: "Agricultural automation, robotics, digital training programs",
            impactReduction: "30% operational efficiency increase",
            technology: "Autonomous tractors, harvesting robots"
        },
        {
            problem: "Limited Access to Technology",
            description: "Outdated farming methods, poor access to modern tools and information",
            solution: "Mobile agriculture services, AI advisory, IoT implementation",
            impactReduction: "20% productivity improvement",
            technology: "mAgri services, AI platforms, satellite data"
        },
        {
            problem: "Post-Harvest Losses",
            description: "Up to 30% produce lost due to poor storage, processing, transport",
            solution: "Cold storage facilities, modern processing, training in handling",
            impactReduction: "30% loss reduction", 
            technology: "Temperature-controlled storage, logistics planning"
        },
        {
            problem: "Economic Constraints & Market Access",
            description: "High production costs, unstable prices, limited market access",
            solution: "Cooperatives, better infrastructure, direct market linkages",
            impactReduction: "30% income increase",
            technology: "Digital marketplaces, rural connectivity"
        }
    ],

    weatherImportance: [
        {
            aspect: "Crop Planning",
            description: "Weather forecasts help determine optimal planting and sowing dates"
        },
        {
            aspect: "Irrigation Management", 
            description: "Precise rainfall predictions enable efficient water usage and scheduling"
        },
        {
            aspect: "Pest Control",
            description: "Weather conditions predict pest and disease outbreaks for timely intervention"
        },
        {
            aspect: "Fertilizer Application",
            description: "Weather timing ensures optimal nutrient uptake and reduces runoff"
        },
        {
            aspect: "Harvest Planning",
            description: "Weather forecasts help plan harvesting to avoid quality deterioration"
        }
    ],

    cropCalendar: [
        {
            name: "January",
            season: "Winter/Rabi",
            temperature: "15-25°C",
            humidity: "60-70%",
            rainfall: "10-20mm",
            crops: [
                {
                    name: "Tomato",
                    type: "Vegetable",
                    sowingPeriod: "First week of January",
                    harvestTime: "90-120 days",
                    varieties: ["Roma", "Cherry", "Hybrid varieties"],
                    waterRequirement: "Medium (400-500mm)",
                    marketPrice: "₹20-40/kg",
                    yield: "40-50 tons/hectare"
                },
                {
                    name: "Cauliflower",
                    type: "Vegetable", 
                    sowingPeriod: "Early January",
                    harvestTime: "80-100 days",
                    varieties: ["Snowball", "Early Kunwari", "Pusa Synthetic"],
                    waterRequirement: "High (500-600mm)",
                    marketPrice: "₹15-30/kg",
                    yield: "20-25 tons/hectare"
                }
            ],
            activities: [
                "Prepare seedbeds for transplanting",
                "Apply organic manure to fields",
                "Check irrigation systems",
                "Monitor for pest infestations"
            ],
            challenges: [
                "Frost damage in northern regions",
                "Waterlogging in low-lying areas",
                "Pest buildup due to mild weather"
            ]
        }
        // Additional months would be added here in a real implementation
    ]
};

// DOM Elements
const monthCards = document.getElementById('monthCards');
const modal = document.getElementById('monthModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const closeModal = document.getElementById('closeModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const downloadInfo = document.getElementById('downloadInfo');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderMonthCards();
    initializeEventListeners();
});

// Render month cards
function renderMonthCards() {
    const monthsContainer = monthCards;
    if (!monthsContainer) return;

    monthsContainer.innerHTML = '';

    // Use enhanced data if available, otherwise use basic data
    const dataToUse = window.enhancedCropCalendar ? Object.values(window.enhancedCropCalendar) : agriculturalData.cropCalendar;

    dataToUse.forEach((month, index) => {
        const monthCard = createMonthCard(month, index);
        monthsContainer.appendChild(monthCard);
    });
}

// Create individual month card
function createMonthCard(month, index) {
    const card = document.createElement('div');
    card.className = 'enhanced-month-card crop-month-card';
    card.setAttribute('data-month-index', index);
    card.setAttribute('data-month', month.month || month.name);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View detailed information for ${month.month || month.name}`);

    const primaryCrop = month.crops && month.crops[0] ? month.crops[0].name : 'Various crops';
    const primaryYield = month.crops && month.crops[0] ? month.crops[0].yield : 'N/A';
    const cropCount = month.crops ? month.crops.length : 0;

    card.innerHTML = `
        <div class="crop-month-header">
            <h3 class="crop-month-name">${month.month || month.name}</h3>
            <span class="season-badge">${month.season}</span>
            <div class="month-quick-stats">
                <span class="quick-stat temp-stat" title="Temperature Range">${month.temperature}</span>
                <span class="quick-stat season-stat" title="Growing Season">${month.season}</span>
            </div>
        </div>
        <div class="crop-month-body">
            <div class="crop-info-grid">
                <div class="crop-info-row">
                    <span class="crop-info-label">Season</span>
                    <span class="crop-info-value">${month.season}</span>
                </div>
                <div class="crop-info-row">
                    <span class="crop-info-label">Temperature</span>
                    <span class="crop-info-value">${month.temperature}</span>
                </div>
                ${month.humidity ? `
                <div class="crop-info-row">
                    <span class="crop-info-label">Humidity</span>
                    <span class="crop-info-value">${month.humidity}</span>
                </div>` : ''}
                ${month.rainfall ? `
                <div class="crop-info-row">
                    <span class="crop-info-label">Rainfall</span>
                    <span class="crop-info-value">${month.rainfall}</span>
                </div>` : ''}
            </div>

            <div class="crop-list">
                <h4>🌾 Main Crops (${cropCount})</h4>
                <div class="crop-items">
                    ${month.crops ? month.crops.slice(0, 3).map(crop => 
                        `<span class="crop-item" title="${crop.type}">${crop.name}</span>`
                    ).join('') : '<span class="crop-item">Various crops</span>'}
                    ${cropCount > 3 ? `<span class="crop-item">+${cropCount - 3} more</span>` : ''}
                </div>
            </div>

            <div class="month-preview">
                <div class="click-hint">
                    <span class="click-icon">👆</span> Click for detailed information, weather conditions, and farming activities
                </div>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openModal(month, index));

    return card;
}

// Open modal with month details
function openModal(month, index) {
    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.textContent = `${month.month || month.name} - Agricultural Calendar`;
    modalBody.innerHTML = createModalContent(month);
    modal.classList.remove('hidden');

    // Store current month data for download
    modal.setAttribute('data-current-month', JSON.stringify(month));
}

// Create modal content
function createModalContent(month) {
    const cropCardsHTML = month.crops ? month.crops.map(crop => createCropCard(crop)).join('') : '<p>No specific crop data available</p>';
    const activitiesHTML = month.activities ? month.activities.map(activity => `<li>${activity}</li>`).join('') : '<li>General farming activities apply</li>';
    const challengesHTML = month.challenges ? month.challenges.map(challenge => `<li>${challenge}</li>`).join('') : '<li>Standard seasonal challenges</li>';

    return `
        <div class="modal-section">
            <h4 class="modal-section-title">
                <div class="modal-section-icon">🌤️</div>
                Weather Conditions
            </h4>
            <div class="weather-info">
                <div class="weather-item">
                    <div class="weather-item-label">Temperature</div>
                    <div class="weather-item-value">${month.temperature}</div>
                </div>
                ${month.humidity ? `
                <div class="weather-item">
                    <div class="weather-item-label">Humidity</div>
                    <div class="weather-item-value">${month.humidity}</div>
                </div>` : ''}
                ${month.rainfall ? `
                <div class="weather-item">
                    <div class="weather-item-label">Rainfall</div>
                    <div class="weather-item-value">${month.rainfall}</div>
                </div>` : ''}
                ${month.soilCondition ? `
                <div class="weather-item">
                    <div class="weather-item-label">Soil Condition</div>
                    <div class="weather-item-value">${month.soilCondition}</div>
                </div>` : ''}
                ${month.avgSunlight ? `
                <div class="weather-item">
                    <div class="weather-item-label">Average Sunlight</div>
                    <div class="weather-item-value">${month.avgSunlight}</div>
                </div>` : ''}
            </div>
        </div>

        <div class="modal-section">
            <h4 class="modal-section-title">
                <div class="modal-section-icon">🌾</div>
                Recommended Crops
            </h4>
            <div class="crops-grid">
                ${cropCardsHTML}
            </div>
        </div>

        <div class="modal-section">
            <h4 class="modal-section-title">
                <div class="modal-section-icon">🚜</div>
                Farming Activities
            </h4>
            <ul class="activities-list">
                ${activitiesHTML}
            </ul>
        </div>

        <div class="modal-section">
            <h4 class="modal-section-title">
                <div class="modal-section-icon">⚠️</div>
                Challenges & Opportunities
            </h4>
            <ul class="challenges-list">
                ${challengesHTML}
            </ul>
        </div>
    `;
}

// Create crop card
function createCropCard(crop) {
    return `
        <div class="crop-card">
            <div class="crop-card-header">
                <h5 class="crop-card-name">${crop.name}</h5>
                <span class="crop-card-type">${crop.type}</span>
            </div>
            <div class="crop-details">
                <div class="crop-detail">
                    <span class="crop-detail-label">Sowing</span>
                    <span class="crop-detail-value">${crop.sowingPeriod}</span>
                </div>
                <div class="crop-detail">
                    <span class="crop-detail-label">Harvest</span>
                    <span class="crop-detail-value">${crop.harvestTime}</span>
                </div>
                <div class="crop-detail">
                    <span class="crop-detail-label">Water Need</span>
                    <span class="crop-detail-value">${crop.waterRequirement}</span>
                </div>
                <div class="crop-detail">
                    <span class="crop-detail-label">Market Price</span>
                    <span class="crop-detail-value">${crop.marketPrice}</span>
                </div>
                <div class="crop-detail">
                    <span class="crop-detail-label">Expected Yield</span>
                    <span class="crop-detail-value">${crop.yield}</span>
                </div>
            </div>
            ${crop.varieties ? `
            <div class="varieties-list">
                <strong>Varieties:</strong> ${crop.varieties.join(', ')}
            </div>` : ''}
        </div>
    `;
}

// Close modal function
function closeModalFunction() {
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Modal close events
    if (modalClose) modalClose.addEventListener('click', closeModalFunction);
    if (closeModal) closeModal.addEventListener('click', closeModalFunction);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModalFunction);

    // Keyboard event for closing modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModalFunction();
        }
    });

    // Download functionality
    if (downloadInfo) {
        downloadInfo.addEventListener('click', function() {
            const monthData = JSON.parse(modal.getAttribute('data-current-month'));
            if (monthData && monthData.name) {
                downloadMonthInfo(monthData);
            }
        });
    }
}

// Download month information
function downloadMonthInfo(monthData) {
    const content = generateDownloadContent(monthData);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${monthData.name}_Agricultural_Calendar.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Generate download content
function generateDownloadContent(month) {
    let content = `AGRICULTURAL CALENDAR - ${(month.month || month.name).toUpperCase()}\n`;
    content += `Season: ${month.season}\n`;
    content += `${'='.repeat(50)}\n\n`;

    content += `WEATHER CONDITIONS\n`;
    content += `Temperature: ${month.temperature}\n`;
    content += `Humidity: ${month.humidity}\n`;
    content += `Rainfall: ${month.rainfall}\n\n`;

    content += `RECOMMENDED CROPS\n`;
    if (month.crops) {
        month.crops.forEach((crop, index) => {
            content += `${index + 1}. ${crop.name} (${crop.type})\n`;
            content += `   Sowing Period: ${crop.sowingPeriod}\n`;
            content += `   Harvest Time: ${crop.harvestTime}\n`;
            content += `   Water Requirement: ${crop.waterRequirement}\n`;
            content += `   Market Price: ${crop.marketPrice}\n`;
            content += `   Expected Yield: ${crop.yield}\n`;
            if (crop.varieties) {
                content += `   Varieties: ${crop.varieties.join(', ')}\n`;
            }
            content += `\n`;
        });
    }

    content += `FARMING ACTIVITIES\n`;
    if (month.activities) {
        month.activities.forEach((activity, index) => {
            content += `${index + 1}. ${activity}\n`;
        });
    }
    content += `\n`;

    content += `CHALLENGES & OPPORTUNITIES\n`;
    if (month.challenges) {
        month.challenges.forEach((challenge, index) => {
            content += `${index + 1}. ${challenge}\n`;
        });
    }
    content += `\n`;

    content += `${'='.repeat(50)}\n`;
    content += `Generated by AgriTech Solutions Agricultural Calendar\n`;
    content += `Date: ${new Date().toLocaleDateString()}`;

    return content;
}

// Global application state
let currentSection = 'home';
let currentUser = null;
let isLoggedIn = false;
let isInitialized = false;

// DOM utility functions with error handling
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function safeGetElement(selector, context = document) {
    try {
        return context.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`, error);
        return null;
    }
}

function safeGetElements(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`, error);
        return [];
    }
}

// Navigation system with enhanced error handling
function initNavigation() {
    try {
        const navLinks = safeGetElements('.nav__link');
        const overviewButtons = safeGetElements('[data-section]');

        // Handle navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                if (targetSection) {
                    showSection(targetSection);
                }
            });
        });

        // Handle overview card button clicks  
        overviewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = button.getAttribute('data-section');
                if (targetSection) {
                    showSection(targetSection);
                }
            });
        });

        // Mobile menu toggle with fallback
        const mobileMenuToggle = safeGetElement('#mobileMenuToggle');
        const nav = safeGetElement('.nav');
        
        if (mobileMenuToggle && nav) {
            mobileMenuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                // Add ARIA attribute for accessibility
                const isOpen = nav.classList.contains('active');
                mobileMenuToggle.setAttribute('aria-expanded', isOpen);
            });
            
            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    nav.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        console.log('Navigation initialized successfully');
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

function showSection(sectionId) {
    try {
        // Validate section ID
        const validSections = ['home', 'problems', 'weather', 'crops', 'login'];
        if (!validSections.includes(sectionId)) {
            console.warn(`Invalid section ID: ${sectionId}`);
            return;
        }

        // Hide all sections
        const sections = safeGetElements('.section');
        sections.forEach(section => {
            section.classList.remove('active');
            // Add fade out effect
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });

        // Show target section
        const targetSection = safeGetElement(`#${sectionId}`);
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.add('active');
                targetSection.classList.add('fade-in');
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 150);
        }

        // Update navigation active state
        const navLinks = safeGetElements('.nav__link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        currentSection = sectionId;
        
        // Update URL hash without triggering hashchange
        if (window.location.hash.slice(1) !== sectionId) {
            history.pushState(null, null, `#${sectionId}`);
        }
        
        // Scroll to top smoothly
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });

        // Load section-specific content
        loadSectionContent(sectionId);

    } catch (error) {
        console.error(`Error showing section ${sectionId}:`, error);
        showMessage('Navigation error occurred', 'error');
    }
}

function loadSectionContent(sectionId) {
    try {
        switch (sectionId) {
            case 'problems':
                loadAgriculturalProblems();
                break;
            case 'weather':
                loadWeatherImportance();
                                // Initialize weather functionality when weather section is loaded
                initWeatherSection();
                break;
            case 'crops':
                loadSeasonsOverview();
                loadCropCalendar();
                break;
        }
    } catch (error) {
        console.error(`Error loading content for section ${sectionId}:`, error);
    }
}

// Enhanced Farmer Authentication System
function initFarmerAuth() {
    try {
        // Auth tab switching with validation
        const authTabs = safeGetElements('.auth-tab');
        const authForms = safeGetElements('.auth-form');
        
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.getAttribute('data-tab');
                
                if (!tabType) {
                    console.warn('Tab missing data-tab attribute');
                    return;
                }
                
                // Update active tab
                authTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                
                // Show corresponding form
                authForms.forEach(form => {
                    form.classList.remove('active');
                    form.setAttribute('aria-hidden', 'true');
                    if (form.id === `${tabType}Form`) {
                        form.classList.add('active');
                        form.setAttribute('aria-hidden', 'false');
                    }
                });
            });
        });
        
        // Login form handling with enhanced validation
        const loginForm = safeGetElement('.farmer-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        // Registration form handling with enhanced validation
        const registerForm = safeGetElement('.farmer-register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegistration);
        }

        // Real-time password validation
        setupPasswordValidation();
        
        // Form field validation
        setupFormValidation();

        console.log('Farmer authentication initialized successfully');
    } catch (error) {
        console.error('Error initializing farmer authentication:', error);
    }
}

function setupPasswordValidation() {
    const passwordField = safeGetElement('#registerPassword');
    const confirmPasswordField = safeGetElement('#confirmPassword');
    
    if (passwordField && confirmPasswordField) {
        const validatePasswords = () => {
            const password = passwordField.value;
            const confirmPassword = confirmPasswordField.value;
            
            if (confirmPassword && password !== confirmPassword) {
                confirmPasswordField.setCustomValidity('Passwords do not match');
                confirmPasswordField.classList.add('error');
            } else {
                confirmPasswordField.setCustomValidity('');
                confirmPasswordField.classList.remove('error');
            }
        };

        passwordField.addEventListener('input', validatePasswords);
        confirmPasswordField.addEventListener('input', validatePasswords);
    }
}

function setupFormValidation() {
    const inputs = safeGetElements('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    field.classList.remove('error');
    return true;
}

function handleLogin(e) {
    e.preventDefault();
    
    const submitBtn = safeGetElement('.login-submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
    
    if (!submitBtn) {
        console.error('Login submit button not found');
        return;
    }
    
    // Show loading state
    setButtonLoadingState(submitBtn, btnText, btnSpinner, true);
    
    const loginData = {
        email: safeGetElement('#loginEmail')?.value || '',
        password: safeGetElement('#loginPassword')?.value || '',
        remember: safeGetElement('#rememberMe')?.checked || false
    };
    
    // Validate form data
    if (!validateLoginData(loginData)) {
        setButtonLoadingState(submitBtn, btnText, btnSpinner, false);
        return;
    }
    
    // Simulate API call with realistic delay
    setTimeout(() => {
        try {
            console.log('Login attempt for:', loginData.email);
            
            // Mock successful login (in real app, this would be an API call)
            currentUser = {
                id: Date.now(),
                email: loginData.email,
                name: generateNameFromEmail(loginData.email),
                farmLocation: "Sample Farm Location",
                loginTime: new Date().toISOString()
            };
            
            isLoggedIn = true;
            
            // Save to sessionStorage for persistence
            saveUserSession();
            
            // Update UI
            updateLoginButtonState();
            
            // Show success message
            showMessage('Welcome back! Login successful.', 'success');
            
            // Reset form
            e.target.reset();
            
            // Reset button state
            setButtonLoadingState(submitBtn, btnText, btnSpinner, false);
            
            // Redirect to home after delay
            setTimeout(() => showSection('home'), 1500);
            
        } catch (error) {
            console.error('Login error:', error);
            showMessage('Login failed. Please try again.', 'error');
            setButtonLoadingState(submitBtn, btnText, btnSpinner, false);
        }
        
    }, 2000);
}

function handleRegistration(e) {
    e.preventDefault();
    
    const submitBtn = safeGetElement('.register-submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
    
    if (!submitBtn) {
        console.error('Register submit button not found');
        return;
    }
    
    // Show loading state
    setButtonLoadingState(submitBtn, btnText, btnSpinner, true);
    
    const registrationData = {
        firstName: safeGetElement('#firstName')?.value || '',
        lastName: safeGetElement('#lastName')?.value || '',
        email: safeGetElement('#registerEmail')?.value || '',
        phoneNumber: safeGetElement('#phoneNumber')?.value || '',
        farmLocation: safeGetElement('#farmLocation')?.value || '',
        farmSize: safeGetElement('#farmSize')?.value || '',
        cropTypes: getCropTypes(),
        password: safeGetElement('#registerPassword')?.value || '',
        confirmPassword: safeGetElement('#confirmPassword')?.value || ''
    };
    
    // Validate form data
    if (!validateRegistrationData(registrationData)) {
        setButtonLoadingState(submitBtn, btnText, btnSpinner, false);
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        try {
            console.log('Registration attempt:', {
                ...registrationData, 
                password: '[HIDDEN]', 
                confirmPassword: '[HIDDEN]'
            });
            
            // Mock successful registration
            currentUser = {
                id: Date.now(),
                email: registrationData.email,
                name: `${registrationData.firstName} ${registrationData.lastName}`,
                farmLocation: registrationData.farmLocation,
                farmSize: registrationData.farmSize,
                cropTypes: registrationData.cropTypes,
                phoneNumber: registrationData.phoneNumber,
                registrationTime: new Date().toISOString()
            };
            
            isLoggedIn = true;
            
            // Save to sessionStorage for persistence
            saveUserSession();
            
            // Update UI
            updateLoginButtonState();
            
            // Show success message
            showMessage('Account created successfully! Welcome to AgriTech Solutions.', 'success');
            
            // Reset form
            e.target.reset();
            
            // Reset button state
            setButtonLoadingState(submitBtn, btnText, btnSpinner, false);
            
            // Redirect to home
            setTimeout(() => showSection('home'), 2000);
            
        } catch (error) {
            console.error('Registration error:', error);
            showMessage('Registration failed. Please try again.', 'error');
            setButtonLoadingState(submitBtn, btnText, btnSpinner, false);
        }
        
    }, 2500);
}

function getCropTypes() {
    const cropSelect = safeGetElement('#cropTypes');
    if (cropSelect && cropSelect.multiple) {
        return Array.from(cropSelect.selectedOptions).map(opt => opt.value);
    }
    return [];
}

function validateLoginData(data) {
    if (!data.email || !data.password) {
        showMessage('Please fill in all required fields', 'error');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
    }
    
    return true;
}

function validateRegistrationData(data) {
    const required = ['firstName', 'lastName', 'email', 'farmLocation', 'password'];
    
    for (const field of required) {
        if (!data[field]) {
            showMessage(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            return false;
        }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
    }
    
    if (data.confirmPassword && data.password !== data.confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return false;
    }
    
    return true;
}

function setButtonLoadingState(button, textElement, spinnerElement, isLoading) {
    if (!button) return;
    
    if (isLoading) {
        button.disabled = true;
        if (textElement) textElement.style.display = 'none';
        if (spinnerElement) spinnerElement.style.display = 'inline-block';
    } else {
        button.disabled = false;
        if (textElement) textElement.style.display = 'inline-block';
        if (spinnerElement) spinnerElement.style.display = 'none';
    }
}

function updateLoginButtonState() {
    const loginBtn = safeGetElement('.farmer-login-btn');
    const loginText = loginBtn ? loginBtn.querySelector('.login-text') : null;
    
    if (!loginBtn || !loginText) return;
    
    if (isLoggedIn && currentUser) {
        const firstName = currentUser.name.split(' ')[0];
        loginText.innerHTML = `👨‍🌾 Welcome, ${firstName}`;
        loginBtn.setAttribute('data-section', 'dashboard');
        loginBtn.setAttribute('title', 'Click to logout');
        
        // Remove blinking effect
        const blinkDot = loginBtn.querySelector('.blink-dot');
        if (blinkDot) {
            blinkDot.style.display = 'none';
        }
        
        // Add logout functionality
        loginBtn.removeEventListener('click', handleLogin);
        loginBtn.addEventListener('click', handleLogout);
    } else {
        loginText.innerHTML = '🚜 Farmer Login';
        loginBtn.setAttribute('data-section', 'login');
        loginBtn.setAttribute('title', 'Click to login or register');
        
        // Restore blinking effect
        const blinkDot = loginBtn.querySelector('.blink-dot');
        if (blinkDot) {
            blinkDot.style.display = 'block';
        }
        
        // Remove logout functionality
        loginBtn.removeEventListener('click', handleLogout);
    }
}

function handleLogout(e) {
    if (isLoggedIn) {
        e.preventDefault();
        
        // Confirm logout
        if (confirm('Are you sure you want to logout?')) {
            // Clear user data
            currentUser = null;
            isLoggedIn = false;
            
            // Clear sessionStorage
            clearUserSession();
            
            // Update UI
            updateLoginButtonState();
            
            // Show message
            showMessage('Logged out successfully', 'success');
            
            // Redirect to home
            setTimeout(() => showSection('home'), 1000);
        }
    }
}

function saveUserSession() {
    try {
        if (currentUser) {
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            sessionStorage.setItem('isLoggedIn', 'true');
        }
    } catch (error) {
        console.error('Error saving user session:', error);
    }
}

function loadUserSession() {
    try {
        const savedUser = sessionStorage.getItem('currentUser');
        const savedLoginState = sessionStorage.getItem('isLoggedIn');
        
        if (savedUser && savedLoginState === 'true') {
            currentUser = JSON.parse(savedUser);
            isLoggedIn = true;
            updateLoginButtonState();
            console.log('User session loaded successfully');
        }
    } catch (error) {
        console.error('Error loading user session:', error);
        clearUserSession();
    }
}

function clearUserSession() {
    try {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('isLoggedIn');
    } catch (error) {
        console.error('Error clearing user session:', error);
    }
}

function generateNameFromEmail(email) {
    const username = email.split('@')[0];
    const name = username.replace(/[^a-zA-Z]/g, ' ').trim();
    return name.charAt(0).toUpperCase() + name.slice(1) + ' Farmer';
}

function showMessage(message, type = 'info', duration = 4000) {
    try {
        // Remove existing messages
        const existingMessages = safeGetElements('.auth-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
            word-wrap: break-word;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            cursor: pointer;
        `;
        
        // Set background color based on type
        const backgrounds = {
            'success': 'linear-gradient(45deg, #10b981, #059669)',
            'error': 'linear-gradient(45deg, #ef4444, #dc2626)',
            'info': 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
            'warning': 'linear-gradient(45deg, #f59e0b, #d97706)'
        };
        
        messageDiv.style.background = backgrounds[type] || backgrounds['info'];
        messageDiv.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 10px;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.7;
        `;
        closeBtn.addEventListener('click', () => messageDiv.remove());
        messageDiv.appendChild(closeBtn);
        
        // Add to page
        document.body.appendChild(messageDiv);
        
        // Auto remove after specified duration
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, duration);
        
        // Remove on click
        messageDiv.addEventListener('click', () => messageDiv.remove());
        
    } catch (error) {
        console.error('Error showing message:', error);
        // Fallback to alert
        alert(`${type.toUpperCase()}: ${message}`);
    }
}

// Content loading functions
function loadAgriculturalProblems() {
    const problemsGrid = safeGetElement('#problemsGrid');
    if (!problemsGrid) return;
    
    try {
        const problemsHTML = agriculturalData.agriculturalProblems.map((problem, index) => {
            return `
                <div class="problem-card" style="animation-delay: ${index * 0.1}s">
                    <h3>${problem.problem}</h3>
                    <p class="problem-description">${problem.description}</p>
                    <div class="problem-solution">
                        <h4>💡 Solution</h4>
                        <p>${problem.solution}</p>
                    </div>
                    <div class="problem-stats">
                        <div class="stat-item">
                            <div class="stat-label">Impact Reduction</div>
                            <div class="stat-value">${problem.impactReduction}</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Technology</div>
                            <div class="stat-value">${problem.technology}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        problemsGrid.innerHTML = problemsHTML;
        console.log('Agricultural problems loaded successfully');
    } catch (error) {
        console.error('Error loading agricultural problems:', error);
        problemsGrid.innerHTML = '<p>Error loading problems data</p>';
    }
}

function loadWeatherImportance() {
    const weatherContainer = safeGetElement('#weatherImportance');
    if (!weatherContainer) return;
    
    try {
        const weatherHTML = agriculturalData.weatherImportance.map((item, index) => {
            return `
                <div class="weather-card" style="animation-delay: ${index * 0.1}s">
                    <h3>${item.aspect}</h3>
                    <p>${item.description}</p>
                </div>
            `;
        }).join('');
        
        weatherContainer.innerHTML = weatherHTML;
        console.log('Weather importance loaded successfully');
    } catch (error) {
        console.error('Error loading weather importance:', error);
        weatherContainer.innerHTML = '<p>Error loading weather data</p>';
    }
}

function loadSeasonsOverview() {
    const seasonsContainer = safeGetElement('#seasonsOverview');
    if (!seasonsContainer) return;
    
    try {
        const seasons = agriculturalData.seasons;
        const seasonsHTML = Object.entries(seasons).map(([key, season], index) => {
            const exampleTags = season.examples.map(crop => 
                `<span class="crop-tag">${crop}</span>`
            ).join('');
            
            return `
                <div class="season-card" style="animation-delay: ${index * 0.1}s">
                    <h3>${key.charAt(0).toUpperCase() + key.slice(1)} Season</h3>
                    <div class="season-period">${season.period}</div>
                    <p>${season.description}</p>
                    <div class="season-examples">
                        <h4>Example Crops</h4>
                        <div class="crop-tags">${exampleTags}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        seasonsContainer.innerHTML = seasonsHTML;
        console.log('Seasons overview loaded successfully');
    } catch (error) {
        console.error('Error loading seasons overview:', error);
        seasonsContainer.innerHTML = '<p>Error loading seasons data</p>';
    }
}


// Enhanced Crop Calendar with detailed monthly information and click functionality
function loadCropCalendar(filterMonth = null) {
  const cropCalendarContainer = safeGetElement('cropCalendar');
  if (!cropCalendarContainer) return;

  try {
    // Use enhanced data if available, fallback to original
    let cropData = window.enhancedCropCalendar || agriculturalData.cropCalendar;

    // If using enhanced data, convert to array format
    if (window.enhancedCropCalendar) {
      cropData = Object.values(window.enhancedCropCalendar);
    }

    // Filter by month if specified
    if (filterMonth && filterMonth !== 'All Months' && filterMonth !== '') {
      if (window.enhancedCropCalendar) {
        cropData = [window.enhancedCropCalendar[filterMonth]];
      } else {
        cropData = cropData.filter(item => item.month === filterMonth);
      }
    }

    const cropHTML = cropData.map((monthData, index) => {
      // Handle both enhanced and original data formats
      const crops = monthData.crops || [];
      const cropItems = crops.map(crop => {
        const cropName = crop.name || crop;
        return `<span class="crop-item" title="${crop.type || ''}">${cropName}</span>`;
      }).join('');

      const season = monthData.season || 'N/A';
      const temperature = monthData.temperature || 'N/A';
      const sowingMethod = monthData.sowingMethod || 'Various methods';
      const humidity = monthData.humidity || 'N/A';
      const rainfall = monthData.rainfall || 'N/A';

      return `
        <div class="crop-month-card enhanced-month-card" 
             style="animation-delay: ${index * 0.05}s" 
             data-month="${monthData.month}"
             onclick="openMonthDetails('${monthData.month}')"
             tabindex="0"
             role="button"
             aria-label="View detailed information for ${monthData.month}">
          <div class="crop-month-header">
            <h3>${monthData.month}</h3>
            <div class="month-quick-stats">
              <span class="quick-stat temp-stat" title="Temperature Range">🌡️ ${temperature}</span>
              <span class="quick-stat season-stat" title="Growing Season">📅 ${season}</span>
            </div>
          </div>
          <div class="crop-month-body">
            <div class="crop-info-grid">
              <div class="crop-info-row">
                <span class="crop-info-label">Season</span>
                <span class="season-badge">${season}</span>
              </div>
              <div class="crop-info-row">
                <span class="crop-info-label">Temperature</span>
                <span class="crop-info-value">${temperature}</span>
              </div>
              ${monthData.humidity ? `
                <div class="crop-info-row">
                  <span class="crop-info-label">Humidity</span>
                  <span class="crop-info-value">${humidity}</span>
                </div>
              ` : ''}
              ${monthData.rainfall ? `
                <div class="crop-info-row">
                  <span class="crop-info-label">Rainfall</span>
                  <span class="crop-info-value">${rainfall}</span>
                </div>
              ` : ''}
            </div>
            <div class="crop-list">
              <h4>Main Crops (${crops.length})</h4>
              <div class="crop-items">${cropItems}</div>
            </div>
            <div class="month-preview">
              <p class="click-hint">
                <span class="click-icon">👆</span>
                Click for detailed information, weather conditions, and farming activities
              </p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    cropCalendarContainer.innerHTML = cropHTML;

    // Add keyboard navigation
    addKeyboardNavigationToMonthCards();

    console.log(`Crop calendar loaded successfully${filterMonth ? ` (filtered by ${filterMonth})` : ''}`);
  } catch (error) {
    console.error('Error loading crop calendar:', error);
    cropCalendarContainer.innerHTML = '<p>Error loading crop calendar</p>';
  }
}

// Function to open detailed month information in a modal
function openMonthDetails(monthName) {
  const monthData = window.enhancedCropCalendar && window.enhancedCropCalendar[monthName];

  if (!monthData) {
    showMessage(`Detailed information for ${monthName} is not available`, 'warning');
    return;
  }

  // Create modal HTML
  const modalHTML = `
    <div id="monthModal" class="month-modal" onclick="closeMonthModal(event)">
      <div class="month-modal-content">
        <div class="month-modal-header">
          <h2>${monthData.month} - ${monthData.season}</h2>
          <button class="modal-close" onclick="closeMonthModal()">&times;</button>
        </div>

        <div class="month-modal-body">
          <!-- Weather Conditions Section -->
          <div class="modal-section weather-section">
            <h3><span class="section-icon">🌤️</span> Weather Conditions</h3>
            <div class="weather-grid">
              <div class="weather-stat">
                <span class="stat-label">Temperature</span>
                <span class="stat-value">${monthData.temperature}</span>
              </div>
              <div class="weather-stat">
                <span class="stat-label">Humidity</span>
                <span class="stat-value">${monthData.humidity}</span>
              </div>
              <div class="weather-stat">
                <span class="stat-label">Rainfall</span>
                <span class="stat-value">${monthData.rainfall}</span>
              </div>
              <div class="weather-stat">
                <span class="stat-label">Soil Condition</span>
                <span class="stat-value">${monthData.soilCondition}</span>
              </div>
              <div class="weather-stat">
                <span class="stat-label">Sunlight</span>
                <span class="stat-value">${monthData.avgSunlight}</span>
              </div>
            </div>

            ${monthData.weatherConditions ? `
              <div class="detailed-weather">
                <h4>Detailed Weather Parameters</h4>
                <div class="weather-details-grid">
                  <div class="weather-detail">
                    <span>Min Temperature</span>
                    <span>${monthData.weatherConditions.minTemp}</span>
                  </div>
                  <div class="weather-detail">
                    <span>Max Temperature</span>
                    <span>${monthData.weatherConditions.maxTemp}</span>
                  </div>
                  <div class="weather-detail">
                    <span>Wind Speed</span>
                    <span>${monthData.weatherConditions.windSpeed}</span>
                  </div>
                  <div class="weather-detail">
                    <span>Soil Temperature</span>
                    <span>${monthData.weatherConditions.soilTemp}</span>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Crops Section -->
          <div class="modal-section crops-section">
            <h3><span class="section-icon">🌾</span> Recommended Crops (${monthData.crops.length})</h3>
            <div class="crops-grid">
              ${monthData.crops.map(crop => `
                <div class="crop-card">
                  <div class="crop-header">
                    <h4>${crop.name}</h4>
                    <span class="crop-type">${crop.type}</span>
                  </div>
                  <div class="crop-details">
                    <div class="crop-info">
                      <span class="info-label">Sowing Period</span>
                      <span class="info-value">${crop.sowingPeriod}</span>
                    </div>
                    <div class="crop-info">
                      <span class="info-label">Harvest Time</span>
                      <span class="info-value">${crop.harvestTime}</span>
                    </div>
                    <div class="crop-info">
                      <span class="info-label">Water Requirement</span>
                      <span class="info-value">${crop.waterRequirement}</span>
                    </div>
                    <div class="crop-info">
                      <span class="info-label">Market Price</span>
                      <span class="info-value price">${crop.marketPrice}</span>
                    </div>
                    <div class="crop-info">
                      <span class="info-label">Expected Yield</span>
                      <span class="info-value">${crop.yield}</span>
                    </div>
                    <div class="crop-varieties">
                      <span class="info-label">Popular Varieties</span>
                      <div class="varieties-list">
                        ${crop.varieties.map(variety => `<span class="variety-tag">${variety}</span>`).join('')}
                      </div>
                    </div>
                    <div class="crop-diseases">
                      <span class="info-label">Common Issues</span>
                      <div class="diseases-list">
                        ${crop.diseases.map(disease => `<span class="disease-tag">${disease}</span>`).join('')}
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Farming Activities Section -->
          <div class="modal-section activities-section">
            <h3><span class="section-icon">🚜</span> Farming Activities</h3>
            <div class="activities-list">
              ${monthData.farmingActivities.map(activity => `
                <div class="activity-item">
                  <span class="activity-bullet">✓</span>
                  <span class="activity-text">${activity}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Best Practices Section -->
          <div class="modal-section practices-section">
            <h3><span class="section-icon">💡</span> Best Practices</h3>
            <div class="practices-list">
              ${monthData.bestPractices.map(practice => `
                <div class="practice-item">
                  <span class="practice-bullet">💡</span>
                  <span class="practice-text">${practice}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Challenges and Opportunities -->
          <div class="challenges-opportunities">
            <div class="modal-section challenges-section">
              <h3><span class="section-icon">⚠️</span> Challenges</h3>
              <div class="challenges-list">
                ${monthData.challenges.map(challenge => `
                  <div class="challenge-item">
                    <span class="challenge-bullet">⚠️</span>
                    <span class="challenge-text">${challenge}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="modal-section opportunities-section">
              <h3><span class="section-icon">🌟</span> Opportunities</h3>
              <div class="opportunities-list">
                ${monthData.opportunities.map(opportunity => `
                  <div class="opportunity-item">
                    <span class="opportunity-bullet">🌟</span>
                    <span class="opportunity-text">${opportunity}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="month-modal-footer">
          <button class="btn btn--secondary" onclick="closeMonthModal()">Close</button>
          <button class="btn btn--primary" onclick="downloadMonthInfo('${monthName}')">
            Download Info
          </button>
        </div>
      </div>
    </div>
  `;

  // Add modal to page
  const existingModal = document.getElementById('monthModal');
  if (existingModal) {
    existingModal.remove();
  }

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Add event listeners
  document.addEventListener('keydown', handleModalKeyboard);

  // Focus management
  setTimeout(() => {
    const modal = document.getElementById('monthModal');
    if (modal) {
      modal.focus();
    }
  }, 100);

  console.log(`Opened detailed view for ${monthName}`);
}

// Function to close the month details modal
function closeMonthModal(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
    return;
  }

  const modal = document.getElementById('monthModal');
  if (modal) {
    modal.remove();
    document.removeEventListener('keydown', handleModalKeyboard);
  }
}

// Handle keyboard navigation in modal
function handleModalKeyboard(e) {
  if (e.key === 'Escape') {
    closeMonthModal();
  }
}

// Add keyboard navigation to month cards
function addKeyboardNavigationToMonthCards() {
  const monthCards = document.querySelectorAll('.enhanced-month-card');
  monthCards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const monthName = card.getAttribute('data-month');
        openMonthDetails(monthName);
      }
    });
  });
}

// Function to download month information
function downloadMonthInfo(monthName) {
  const monthData = window.enhancedCropCalendar[monthName];
  if (!monthData) return;

  const content = `
${monthName} Agricultural Guide
${'='.repeat(30)}

WEATHER CONDITIONS:
- Temperature: ${monthData.temperature}
- Humidity: ${monthData.humidity}
- Rainfall: ${monthData.rainfall}
- Soil Condition: ${monthData.soilCondition}
- Average Sunlight: ${monthData.avgSunlight}

RECOMMENDED CROPS:
${monthData.crops.map(crop => `
• ${crop.name} (${crop.type})
  - Sowing: ${crop.sowingPeriod}
  - Harvest: ${crop.harvestTime}
  - Water Requirement: ${crop.waterRequirement}
  - Market Price: ${crop.marketPrice}
  - Expected Yield: ${crop.yield}
  - Varieties: ${crop.varieties.join(', ')}
  - Common Issues: ${crop.diseases.join(', ')}
`).join('')}

FARMING ACTIVITIES:
${monthData.farmingActivities.map(activity => `• ${activity}`).join('\n')}

BEST PRACTICES:
${monthData.bestPractices.map(practice => `• ${practice}`).join('\n')}

CHALLENGES TO WATCH:
${monthData.challenges.map(challenge => `• ${challenge}`).join('\n')}

OPPORTUNITIES:
${monthData.opportunities.map(opportunity => `• ${opportunity}`).join('\n')}

Generated by AgriTech Solutions - ${new Date().toLocaleDateString()}
  `;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${monthName}_Agricultural_Guide.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showMessage(`${monthName} agricultural guide downloaded successfully!`, 'success');
}


// Initialize crop calendar filter
function initCropFilter() {
    const monthFilter = safeGetElement('#monthFilter');
    if (!monthFilter) return;
    
    try {
        monthFilter.addEventListener('change', (e) => {
            const selectedMonth = e.target.value === '' || e.target.value === 'All Months' ? null : e.target.value;
            loadCropCalendar(selectedMonth);
        });
        console.log('Crop filter initialized successfully');
    } catch (error) {
        console.error('Error initializing crop filter:', error);
    }
}

// Initialize editable links
function initEditableLinks() {
    const editableLinks = safeGetElements('.editable-link');
    
    editableLinks.forEach(link => {
        try {
            // Load saved content from localStorage
            const linkKey = `link_${link.textContent.trim().replace(/\s+/g, '_')}`;
            const savedHref = localStorage.getItem(`${linkKey}_href`);
            const savedText = localStorage.getItem(`${linkKey}_text`);
            
            if (savedHref) link.href = savedHref;
            if (savedText) link.textContent = savedText;
            
            // Handle content editing
            link.addEventListener('blur', () => {
                const newText = link.textContent.trim();
                const newHref = link.href;
                
                if (newText) localStorage.setItem(`${linkKey}_text`, newText);
                localStorage.setItem(`${linkKey}_href`, newHref);
            });
            
            // Allow editing href by double-clicking
            link.addEventListener('dblclick', (e) => {
                e.preventDefault();
                const currentHref = link.href;
                const newHref = prompt('Edit URL:', currentHref);
                
                if (newHref && newHref !== currentHref) {
                    link.href = newHref;
                    localStorage.setItem(`${linkKey}_href`, newHref);
                }
            });
            
            // Prevent navigation when editing
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    link.blur();
                }
            });
        } catch (error) {
            console.error('Error setting up editable link:', error);
        }
    });
    
    console.log(`Initialized ${editableLinks.length} editable links`);
}

// Handle URL hash navigation
function initHashNavigation() {
    try {
        // Handle initial hash
        const initialHash = window.location.hash.slice(1);
        if (initialHash && ['home', 'problems', 'weather', 'crops', 'login'].includes(initialHash)) {
            showSection(initialHash);
        } else {
            showSection('home');
        }
        
        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash && ['home', 'problems', 'weather', 'crops', 'login'].includes(hash)) {
                showSection(hash);
            }
        });
        
        console.log('Hash navigation initialized successfully');
    } catch (error) {
        console.error('Error initializing hash navigation:', error);
    }
}

// Accessibility improvements
function initAccessibility() {
    try {
        // Add keyboard navigation support
        const focusableElements = safeGetElements('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            if (!element.getAttribute('role')) {
                if (element.tagName === 'BUTTON') {
                    element.setAttribute('role', 'button');
                }
            }
        });
        
        // Add ARIA labels where needed
        const navLinks = safeGetElements('.nav__link');
        navLinks.forEach(link => {
            const section = link.getAttribute('data-section');
            if (section) {
                link.setAttribute('aria-label', `Navigate to ${section} section`);
            }
        });
        
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            z-index: 10001;
            text-decoration: none;
            transition: top 0.3s;
        `;
        skipLink.addEventListener('focus', () => skipLink.style.top = '6px');
        skipLink.addEventListener('blur', () => skipLink.style.top = '-40px');
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        console.log('Accessibility features initialized successfully');
    } catch (error) {
        console.error('Error initializing accessibility:', error);
    }
}

// Performance optimization - lazy loading
function initLazyLoading() {
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        // Observe cards for animation
        const cards = safeGetElements('.card, .problem-card, .weather-card, .season-card, .crop-month-card, .benefit-card');
        cards.forEach(card => {
            observer.observe(card);
        });
        
        console.log(`Lazy loading observer set up for ${cards.length} elements`);
    } catch (error) {
        console.error('Error initializing lazy loading:', error);
    }
}

// Error handling
function initErrorHandling() {
    try {
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
            showMessage('An error occurred. Please refresh if issues persist.', 'error');
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            showMessage('An unexpected error occurred.', 'error');
        });
        
        console.log('Error handling initialized successfully');
    } catch (error) {
        console.error('Error initializing error handling:', error);
    }
}


// Weather API Integration
class WeatherApp {
    constructor() {
        this.apiKey = '0d11aacce8534c3fa69174135252109';
        this.baseUrl = 'http://api.weatherapi.com/v1/current.json';
        this.init();
    }

    init() {
        try {
            // Bind event listeners
            const getWeatherBtn = safeGetElement('#getWeatherBtn');
            const locationInput = safeGetElement('#locationInput');

            if (getWeatherBtn) {
                getWeatherBtn.addEventListener('click', () => {
                    this.getWeather();
                });
            }

            if (locationInput) {
                // Allow Enter key to trigger weather fetch
                locationInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.getWeather();
                    }
                });
            }

            // Load default weather on page load if we're on weather section
            if (currentSection === 'weather' || window.location.hash === '#weather') {
                setTimeout(() => {
                    this.getWeather();
                }, 1000);
            }

            console.log('Weather API integration initialized successfully');
        } catch (error) {
            console.error('Error initializing weather app:', error);
        }
    }

    async getWeather() {
        const locationInput = safeGetElement('#locationInput');
        const getWeatherBtn = safeGetElement('#getWeatherBtn');

        if (!locationInput || !getWeatherBtn) {
            console.error('Weather form elements not found');
            return;
        }

        const location = locationInput.value.trim();

        if (!location) {
            this.showWeatherError('Please enter a location');
            return;
        }

        // Show loading state
        this.setWeatherLoadingState(true);

        try {
            const url = `${this.baseUrl}?key=${this.apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Weather data not found for "${location}"`);
            }

            const data = await response.json();
            this.displayWeatherData(data);
            this.generateFarmingAdvisory(data);
            this.showWeatherSuccess(`Weather updated for ${data.location.name}`);

        } catch (error) {
            console.error('Error fetching weather:', error);
            this.showWeatherError(error.message || 'Failed to fetch weather data. Please try again.');
        } finally {
            this.setWeatherLoadingState(false);
        }
    }

    displayWeatherData(data) {
        const { location, current } = data;

        try {
            // Update temperature data
            const tempElement = safeGetElement('#temperature');
            const feelsLikeElement = safeGetElement('#feelsLike');
            if (tempElement) tempElement.textContent = `${current.temp_c}°C`;
            if (feelsLikeElement) feelsLikeElement.textContent = `${current.feelslike_c}°C`;

            // Update weather metrics
            const weatherUpdates = {
                '#humidity': `${current.humidity}%`,
                '#windSpeed': `${current.wind_kph} km/h`,
                '#windDirection': current.wind_dir,
                '#precipitation': `${current.precip_mm} mm`,
                '#pressure': `${current.pressure_mb} mb`,
                '#uvIndex': current.uv,
                '#visibility': `${current.vis_km} km`
            };

            Object.entries(weatherUpdates).forEach(([selector, value]) => {
                const element = safeGetElement(selector);
                if (element) element.textContent = value;
            });

            // Update UV level description
            const uvLevel = this.getUVLevel(current.uv);
            const uvLevelElement = safeGetElement('#uvLevel');
            if (uvLevelElement) uvLevelElement.textContent = uvLevel;

            // Update Air Quality
            if (current.air_quality) {
                const aqiValue = Math.round(current.air_quality['us-epa-index'] || 0);
                const airQualityElement = safeGetElement('#airQuality');
                const airQualityLevelElement = safeGetElement('#airQualityLevel');

                if (airQualityElement) airQualityElement.textContent = aqiValue;
                if (airQualityLevelElement) airQualityLevelElement.textContent = this.getAQILevel(aqiValue);
            }

            console.log('Weather data displayed successfully');
        } catch (error) {
            console.error('Error displaying weather data:', error);
        }
    }

    getUVLevel(uvIndex) {
        if (uvIndex <= 2) return 'Low exposure';
        if (uvIndex <= 5) return 'Moderate exposure';
        if (uvIndex <= 7) return 'High exposure';
        if (uvIndex <= 10) return 'Very high exposure';
        return 'Extreme exposure';
    }

    getAQILevel(aqi) {
        if (aqi <= 50) return 'Good quality';
        if (aqi <= 100) return 'Moderate quality';
        if (aqi <= 150) return 'Unhealthy for sensitive';
        if (aqi <= 200) return 'Unhealthy quality';
        if (aqi <= 300) return 'Very unhealthy';
        return 'Hazardous quality';
    }

    generateFarmingAdvisory(data) {
        const { current } = data;
        const advisoryContent = safeGetElement('#advisoryContent');

        if (!advisoryContent) return;

        let advisory = [];

        try {
            // Temperature-based advice
            if (current.temp_c > 35) {
                advisory.push('🌡️ <strong>High Temperature Alert:</strong> Increase irrigation frequency and provide shade for sensitive crops.');
            } else if (current.temp_c < 5) {
                advisory.push('❄️ <strong>Cold Weather Warning:</strong> Protect crops from frost damage and consider greenhouse farming.');
            } else if (current.temp_c >= 20 && current.temp_c <= 30) {
                advisory.push('🌱 <strong>Optimal Growing Conditions:</strong> Ideal temperature for most crop growth.');
            }

            // Humidity-based advice
            if (current.humidity > 80) {
                advisory.push('💧 <strong>High Humidity:</strong> Monitor for fungal diseases and ensure proper ventilation.');
            } else if (current.humidity < 30) {
                advisory.push('🏜️ <strong>Low Humidity:</strong> Increase irrigation and consider mulching to retain moisture.');
            }

            // Wind-based advice
            if (current.wind_kph > 30) {
                advisory.push('💨 <strong>High Wind Alert:</strong> Secure young plants and avoid pesticide spraying.');
            }

            // Precipitation advice
            if (current.precip_mm > 10) {
                advisory.push('🌧️ <strong>Heavy Rainfall:</strong> Ensure proper drainage and delay field operations.');
            } else if (current.precip_mm > 0) {
                advisory.push('🌦️ <strong>Light Rainfall:</strong> Good for natural irrigation but monitor soil moisture.');
            }

            // UV Index advice
            if (current.uv > 7) {
                advisory.push('☀️ <strong>High UV Exposure:</strong> Ideal for sun-loving crops but protect workers during midday.');
            }

            // General advice based on conditions
            const condition = current.condition.text.toLowerCase();
            if (condition.includes('rain') || condition.includes('shower')) {
                advisory.push('🌾 <strong>Rainy Conditions:</strong> Good for water-loving crops like rice. Avoid harvesting.');
            } else if (condition.includes('sunny') || condition.includes('clear')) {
                advisory.push('☀️ <strong>Clear Weather:</strong> Excellent for harvesting and drying crops.');
            } else if (condition.includes('cloud')) {
                advisory.push('☁️ <strong>Cloudy Weather:</strong> Good for transplanting and reducing plant stress.');
            }

            // Default advice if no specific conditions
            if (advisory.length === 0) {
                advisory.push('🌾 <strong>General Advice:</strong> Monitor your crops regularly and adjust farming practices based on weather changes.');
            }

            // Add seasonal advice
            const month = new Date().getMonth() + 1;
            if (month >= 6 && month <= 9) {
                advisory.push('🌾 <strong>Monsoon Season:</strong> Focus on Kharif crops like rice, cotton, and sugarcane.');
            } else if (month >= 10 && month <= 3) {
                advisory.push('🌾 <strong>Rabi Season:</strong> Ideal time for wheat, barley, and mustard cultivation.');
            } else {
                advisory.push('🌾 <strong>Summer Season:</strong> Consider drought-resistant crops and efficient irrigation.');
            }

            advisoryContent.innerHTML = advisory.map(advice => 
                `<div class="advisory-highlight" style="background: rgba(76, 175, 80, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 3px solid #4caf50;">${advice}</div>`
            ).join('');

        } catch (error) {
            console.error('Error generating farming advisory:', error);
            advisoryContent.innerHTML = '<p>Weather data loaded. Monitor conditions for optimal farming.</p>';
        }
    }

    setWeatherLoadingState(isLoading) {
        const getWeatherBtn = safeGetElement('#getWeatherBtn');
        if (!getWeatherBtn) return;

        if (isLoading) {
            getWeatherBtn.disabled = true;
            getWeatherBtn.innerHTML = `
                <span style="display: inline-block; width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></span>
                Loading...
            `;
        } else {
            getWeatherBtn.disabled = false;
            getWeatherBtn.innerHTML = 'Get Weather';
        }
    }

    showWeatherError(message) {
        this.showWeatherMessage(message, 'error');
    }

    showWeatherSuccess(message) {
        this.showWeatherMessage(message, 'success');
    }

    showWeatherMessage(message, type) {
        // Remove existing weather messages
        const existingMessages = document.querySelectorAll('.weather-message');
        existingMessages.forEach(msg => msg.remove());

        const weatherControls = safeGetElement('.weather-controls');
        if (!weatherControls) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `weather-message weather-${type}`;
        messageDiv.style.cssText = `
            padding: 0.75rem 1rem;
            margin: 1rem 0;
            border-radius: 6px;
            font-weight: 500;
            ${type === 'error' 
                ? 'background: #fee; color: #c53030; border: 1px solid #fed7d7;' 
                : 'background: #f0fff4; color: #2d7d32; border: 1px solid #c6f6d5;'
            }
        `;
        messageDiv.textContent = message;

        weatherControls.appendChild(messageDiv);

        // Auto remove after delay
        setTimeout(() => {
            messageDiv.remove();
        }, type === 'error' ? 5000 : 3000);
    }
}

// Initialize weather app
let weatherApp = null;

// Function to initialize weather when weather section is loaded
function initWeatherSection() {
    try {
        if (!weatherApp) {
            weatherApp = new WeatherApp();
            console.log('Weather section initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing weather section:', error);
    }
}

// Add weather initialization to the existing loadSectionContent function
// We'll modify the switch case for weather section


// Main application initialization
function initApp() {
    try {
        console.log('Initializing AgriTech Solutions application...');
        
        // Initialize core systems
        initNavigation();
        initHashNavigation();
        initFarmerAuth();
        
        // Load user session
        loadUserSession();
        
        // Initialize features
        initCropFilter();
        initEditableLinks();
        initAccessibility();
        initLazyLoading();
        initErrorHandling();
        
        // Mark as initialized
        isInitialized = true;
        
        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('agritech-loaded', { 
            detail: { timestamp: new Date().toISOString() }
        }));
        
        console.log('✅ AgriTech Solutions application initialized successfully');
        
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
        
        // Show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 16px;
            border-radius: 8px;
            z-index: 10001;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            text-align: center;
        `;
        errorDiv.innerHTML = `
            <strong>Application Error</strong><br>
            Failed to load properly. Please refresh the page.<br>
            <button onclick="location.reload()" style="margin-top: 10px; padding: 8px 16px; background: rgba(255,255,255,0.2); border: none; border-radius: 4px; color: white; cursor: pointer;">Refresh Page</button>
        `;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => errorDiv.remove(), 10000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM is already ready
    initApp();
}

// Add required CSS animations
const requiredStyles = document.createElement('style');
requiredStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease forwards;
    }
    
    .btn-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .form-control.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
    
    .section {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .auth-message {
        font-family: system-ui, -apple-system, sans-serif;
        line-height: 1.5;
    }
`;
document.head.appendChild(requiredStyles);

// Export for debugging and external access
window.AgriTechApp = {
    // State
    currentSection,
    currentUser,
    isLoggedIn,
    isInitialized,
    
    // Core functions
    showSection,
    loadCropCalendar,
    updateLoginButtonState,
    handleLogout,
    showMessage,
    
    // Data
    agriculturalData,
    
    // Utilities
    safeGetElement,
    safeGetElements
};

// Service worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}

// Print success message to console
console.log('%c🌾 AgriTech Solutions %c- JavaScript Loaded Successfully', 
    'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px;',
    'color: #10b981; font-weight: bold;'
);

// Complete Agricultural Calendar 2025 - Enhanced Crop Calendar Data
// This extends the existing crop calendar with all 12 months of detailed agricultural information

window.enhancedCropCalendar = {
    "January": {
        "month": "January",
        "name": "January",
        "season": "Winter/Rabi",
        "temperature": "15-25°C",
        "humidity": "60-70%",
        "rainfall": "10-20mm",
        "sowingMethod": "Transplanting, Direct seeding",
        "crops": [
            {
                "name": "Tomato",
                "type": "Vegetable",
                "sowingPeriod": "First week of January",
                "harvestTime": "90-120 days",
                "varieties": ["Roma", "Cherry", "Hybrid varieties"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹20-40/kg",
                "yield": "40-50 tons/hectare"
            },
            {
                "name": "Cauliflower",
                "type": "Vegetable", 
                "sowingPeriod": "Early January",
                "harvestTime": "80-100 days",
                "varieties": ["Snowball", "Early Kunwari", "Pusa Synthetic"],
                "waterRequirement": "High (500-600mm)",
                "marketPrice": "₹15-30/kg",
                "yield": "20-25 tons/hectare"
            },
            {
                "name": "Spinach",
                "type": "Leafy Vegetable",
                "sowingPeriod": "Throughout January",
                "harvestTime": "45-60 days",
                "varieties": ["Pusa Bharat", "All Green", "Jyoti"],
                "waterRequirement": "Medium (300-400mm)",
                "marketPrice": "₹25-35/kg",
                "yield": "10-15 tons/hectare"
            },
            {
                "name": "Carrot",
                "type": "Root Vegetable",
                "sowingPeriod": "Mid January",
                "harvestTime": "100-120 days",
                "varieties": ["Pusa Kesar", "Nantes", "Chantenary"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹20-30/kg",
                "yield": "25-35 tons/hectare"
            }
        ],
        "activities": [
            "Prepare seedbeds for transplanting",
            "Apply organic manure to fields",
            "Check irrigation systems",
            "Monitor for pest infestations",
            "Harvest winter crops like wheat preparation",
            "Plan for next season crop rotation"
        ],
        "challenges": [
            "Frost damage in northern regions",
            "Waterlogging in low-lying areas",
            "Pest buildup due to mild weather",
            "Irregular irrigation needs"
        ],
        "fertilizers": ["NPK 19:19:19", "Urea", "DAP", "Organic compost"],
        "irrigationSchedule": "Every 7-10 days",
        "pestControl": ["Aphid control", "Cutworm management", "Fungal disease prevention"],
        "marketTrends": "High demand for fresh vegetables, stable prices"
    },

    "February": {
        "month": "February",
        "name": "February",
        "season": "Late Winter/Rabi",
        "temperature": "18-28°C",
        "humidity": "55-65%",
        "rainfall": "15-30mm",
        "sowingMethod": "Direct seeding, Transplanting",
        "crops": [
            {
                "name": "Onion",
                "type": "Bulb Vegetable",
                "sowingPeriod": "Early February",
                "harvestTime": "120-150 days",
                "varieties": ["Pusa Red", "Agrifound Light Red", "N-53"],
                "waterRequirement": "Medium (400-600mm)",
                "marketPrice": "₹15-25/kg",
                "yield": "20-30 tons/hectare"
            },
            {
                "name": "Cabbage",
                "type": "Vegetable",
                "sowingPeriod": "Mid February",
                "harvestTime": "90-120 days",
                "varieties": ["Golden Acre", "Copenhagen Market", "Pride of India"],
                "waterRequirement": "High (500-700mm)",
                "marketPrice": "₹12-20/kg",
                "yield": "30-40 tons/hectare"
            },
            {
                "name": "Peas",
                "type": "Legume",
                "sowingPeriod": "Throughout February",
                "harvestTime": "60-90 days",
                "varieties": ["Arkel", "Meteor", "Little Marvel"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹30-50/kg",
                "yield": "8-12 tons/hectare"
            },
            {
                "name": "Mustard",
                "type": "Oil Seed",
                "sowingPeriod": "Late February (harvest prep)",
                "harvestTime": "Harvesting time",
                "varieties": ["Pusa Bold", "Rohini", "Varuna"],
                "waterRequirement": "Low (300-400mm)",
                "marketPrice": "₹40-55/kg",
                "yield": "1.5-2.5 tons/hectare"
            }
        ],
        "activities": [
            "Prepare greenhouses and polytunnels",
            "Start seeding for summer vegetables",
            "Spread organic fertilizers and compost",
            "Begin land preparation for Zaid crops",
            "Monitor and control aphids and other pests",
            "Harvest Rabi crops like mustard and gram"
        ],
        "challenges": [
            "Sudden temperature fluctuations",
            "Aphid infestations on mustard and peas",
            "Soil moisture management",
            "Planning transition from Rabi to Zaid season"
        ],
        "fertilizers": ["SSP", "MOP", "Organic manure", "Biofertilizers"],
        "irrigationSchedule": "Every 10-12 days",
        "pestControl": ["Aphid spray", "Thrips management", "Powdery mildew control"],
        "marketTrends": "Peak harvest season, price fluctuations expected"
    },

    "March": {
        "month": "March",
        "name": "March",
        "season": "Spring/Zaid Preparation",
        "temperature": "22-32°C",
        "humidity": "50-60%",
        "rainfall": "20-40mm",
        "sowingMethod": "Direct seeding, Hill planting",
        "crops": [
            {
                "name": "Bottle Gourd",
                "type": "Vegetable",
                "sowingPeriod": "Early to Mid March",
                "harvestTime": "90-120 days",
                "varieties": ["Pusa Naveen", "Long Green", "Round Green"],
                "waterRequirement": "High (600-800mm)",
                "marketPrice": "₹15-25/kg",
                "yield": "30-50 tons/hectare"
            },
            {
                "name": "Cucumber",
                "type": "Vegetable",
                "sowingPeriod": "Mid March",
                "harvestTime": "50-70 days",
                "varieties": ["Japanese Long Green", "Poinsette", "Straight Eight"],
                "waterRequirement": "High (500-700mm)",
                "marketPrice": "₹20-35/kg",
                "yield": "15-25 tons/hectare"
            },
            {
                "name": "Watermelon",
                "type": "Fruit",
                "sowingPeriod": "Late March",
                "harvestTime": "90-100 days",
                "varieties": ["Sugar Baby", "Charleston Grey", "Crimson Sweet"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹8-15/kg",
                "yield": "20-30 tons/hectare"
            },
            {
                "name": "Summer Moong",
                "type": "Pulse",
                "sowingPeriod": "Throughout March",
                "harvestTime": "65-75 days",
                "varieties": ["Pusa Vishal", "SML-668", "Meha"],
                "waterRequirement": "Low-Medium (350-450mm)",
                "marketPrice": "₹60-80/kg",
                "yield": "1-1.5 tons/hectare"
            }
        ],
        "activities": [
            "Plant early potatoes and onion sets",
            "Start seeding for heat-tolerant crops",
            "Prepare land for Zaid season cultivation",
            "Apply pre-emergence fertilizers",
            "Harvest late Rabi crops like wheat and barley",
            "Set up irrigation systems for summer crops"
        ],
        "challenges": [
            "Rising temperatures affecting seed germination",
            "Water scarcity issues beginning",
            "Pest pressure increasing with warming weather",
            "Market price fluctuations during harvest season"
        ],
        "fertilizers": ["NPK 12:32:16", "Potash", "Calcium carbonate", "Micronutrients"],
        "irrigationSchedule": "Every 5-7 days",
        "pestControl": ["Whitefly control", "Fruit borer management", "Fungal spray"],
        "marketTrends": "Transition period, summer crop preparation"
    },

    "April": {
        "month": "April",
        "name": "April", 
        "season": "Spring/Early Summer",
        "temperature": "25-35°C",
        "humidity": "45-55%",
        "rainfall": "10-25mm",
        "sowingMethod": "Direct seeding, Nursery transplanting",
        "crops": [
            {
                "name": "Okra",
                "type": "Vegetable",
                "sowingPeriod": "Early to Mid April",
                "harvestTime": "60-80 days",
                "varieties": ["Pusa A-4", "Varsha Uphar", "Arka Anamika"],
                "waterRequirement": "Medium (450-550mm)",
                "marketPrice": "₹25-40/kg",
                "yield": "12-18 tons/hectare"
            },
            {
                "name": "Bitter Gourd",
                "type": "Vegetable",
                "sowingPeriod": "Mid April",
                "harvestTime": "80-100 days",
                "varieties": ["Pusa Do Mausami", "Coimbatore Long", "Priya"],
                "waterRequirement": "High (550-650mm)",
                "marketPrice": "₹30-50/kg",
                "yield": "10-15 tons/hectare"
            },
            {
                "name": "Chili Pepper",
                "type": "Spice Vegetable",
                "sowingPeriod": "Throughout April",
                "harvestTime": "90-120 days",
                "varieties": ["Pusa Jwala", "Wonder Hot", "Arka Lohit"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹40-80/kg",
                "yield": "8-12 tons/hectare"
            },
            {
                "name": "Fodder Maize",
                "type": "Fodder Crop",
                "sowingPeriod": "Late April",
                "harvestTime": "70-90 days",
                "varieties": ["African Tall", "J-1006", "Moti"],
                "waterRequirement": "Medium (450-600mm)",
                "marketPrice": "₹3-5/kg",
                "yield": "35-50 tons/hectare"
            }
        ],
        "activities": [
            "Transplant seedlings for summer vegetables",
            "Install drip irrigation systems",
            "Fertilizer application for summer crops",
            "Pest monitoring and control measures",
            "Mulching to conserve soil moisture",
            "Begin pre-monsoon soil preparation"
        ],
        "challenges": [
            "Heat stress on young plants",
            "Increased water demand and irrigation costs",
            "Pest and disease pressure intensifying",
            "Labor shortage during peak summer"
        ],
        "fertilizers": ["NPK 20:20:20", "Sulphur", "Zinc sulphate", "Foliar nutrients"],
        "irrigationSchedule": "Every 3-5 days",
        "pestControl": ["Thrips control", "Mite management", "Viral disease prevention"],
        "marketTrends": "Summer vegetable demand rising, good prices expected"
    },

    "May": {
        "month": "May",
        "name": "May",
        "season": "Summer/Pre-Monsoon",
        "temperature": "30-42°C",
        "humidity": "40-50%",
        "rainfall": "15-35mm",
        "sowingMethod": "Direct seeding with shade protection",
        "crops": [
            {
                "name": "Ridge Gourd",
                "type": "Vegetable",
                "sowingPeriod": "Early May",
                "harvestTime": "70-90 days",
                "varieties": ["Pusa Nasdar", "Satputia", "Arka Sumeet"],
                "waterRequirement": "High (600-700mm)",
                "marketPrice": "₹20-35/kg",
                "yield": "12-20 tons/hectare"
            },
            {
                "name": "Drumstick",
                "type": "Vegetable Tree",
                "sowingPeriod": "Throughout May",
                "harvestTime": "8-10 months",
                "varieties": ["PKM-1", "PKM-2", "Bhagya"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹30-60/kg",
                "yield": "5-8 tons/hectare"
            },
            {
                "name": "Sunflower",
                "type": "Oil Seed",
                "sowingPeriod": "Mid to Late May",
                "harvestTime": "90-110 days",
                "varieties": ["MSFH-17", "Surya", "Modern"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹45-60/kg",
                "yield": "1.5-2.5 tons/hectare"
            },
            {
                "name": "Sesame",
                "type": "Oil Seed",
                "sowingPeriod": "Late May",
                "harvestTime": "85-100 days",
                "varieties": ["Rama", "Pragati", "Sekhar"],
                "waterRequirement": "Low (300-400mm)",
                "marketPrice": "₹70-90/kg",
                "yield": "0.8-1.2 tons/hectare"
            }
        ],
        "activities": [
            "Intensive irrigation management",
            "Shade net installation for sensitive crops",
            "Harvest early summer crops",
            "Prepare fields for Kharif season",
            "Deep summer plowing when possible",
            "Pest and disease monitoring"
        ],
        "challenges": [
            "Extreme heat affecting crop growth",
            "High evaporation rates and water stress",
            "Increased pest activity",
            "Limited field work hours due to heat"
        ],
        "fertilizers": ["Water soluble NPK", "Potassium nitrate", "Calcium chloride", "Organic mulch"],
        "irrigationSchedule": "Every 2-3 days",
        "pestControl": ["Red spider mite", "Leaf hopper control", "Heat stress management"],
        "marketTrends": "Peak summer demand, premium prices for quality produce"
    },

    "June": {
        "month": "June",
        "name": "June",
        "season": "Early Monsoon/Kharif Start",
        "temperature": "28-38°C",
        "humidity": "60-80%",
        "rainfall": "100-200mm",
        "sowingMethod": "Direct seeding, Nursery bed preparation",
        "crops": [
            {
                "name": "Rice/Paddy",
                "type": "Cereal",
                "sowingPeriod": "Mid to Late June",
                "harvestTime": "120-150 days",
                "varieties": ["IR-64", "Pusa Basmati-1", "Swarna"],
                "waterRequirement": "High (1200-1500mm)",
                "marketPrice": "₹18-25/kg",
                "yield": "4-6 tons/hectare"
            },
            {
                "name": "Maize",
                "type": "Cereal",
                "sowingPeriod": "Early June",
                "harvestTime": "90-110 days",
                "varieties": ["Ganga-5", "Deccan-107", "Bio-9637"],
                "waterRequirement": "Medium (500-700mm)",
                "marketPrice": "₹15-20/kg",
                "yield": "5-7 tons/hectare"
            },
            {
                "name": "Cotton",
                "type": "Fiber Crop",
                "sowingPeriod": "Throughout June",
                "harvestTime": "180-200 days",
                "varieties": ["Bt Cotton Varieties", "Desi Cotton", "American Cotton"],
                "waterRequirement": "Medium (500-700mm)",
                "marketPrice": "₹50-70/kg",
                "yield": "1.5-2.5 tons/hectare"
            },
            {
                "name": "Soybean",
                "type": "Oil Seed/Pulse",
                "sowingPeriod": "Late June",
                "harvestTime": "95-120 days",
                "varieties": ["JS-335", "MACS-1407", "PK-1024"],
                "waterRequirement": "Medium (450-600mm)",
                "marketPrice": "₹35-45/kg",
                "yield": "2-3 tons/hectare"
            }
        ],
        "activities": [
            "Nursery preparation for paddy",
            "Field preparation with first monsoon rains",
            "Sowing of Kharif crops",
            "Drainage system maintenance",
            "Organic matter incorporation",
            "Initial pest management planning"
        ],
        "challenges": [
            "Monsoon timing uncertainty",
            "Waterlogging in low-lying areas",
            "Seed quality and availability",
            "Early pest and disease establishment"
        ],
        "fertilizers": ["Urea", "DAP", "Complex fertilizers", "Organic FYM"],
        "irrigationSchedule": "Rain-fed, supplementary as needed",
        "pestControl": ["Stem borer", "Yellow stem borer", "Brown plant hopper"],
        "marketTrends": "Kharif season begins, input cost considerations"
    },

    "July": {
        "month": "July",
        "name": "July",
        "season": "Peak Monsoon/Kharif",
        "temperature": "26-32°C",
        "humidity": "75-90%",
        "rainfall": "200-350mm",
        "sowingMethod": "Transplanting, Direct seeding",
        "crops": [
            {
                "name": "Groundnut",
                "type": "Oil Seed",
                "sowingPeriod": "Early to Mid July",
                "harvestTime": "120-140 days",
                "varieties": ["TMV-2", "JL-24", "Girnar-3"],
                "waterRequirement": "Medium (500-750mm)",
                "marketPrice": "₹45-65/kg",
                "yield": "2-3.5 tons/hectare"
            },
            {
                "name": "Sugarcane",
                "type": "Cash Crop",
                "sowingPeriod": "Throughout July",
                "harvestTime": "12-18 months",
                "varieties": ["Co-86032", "Co-238", "CoM-265"],
                "waterRequirement": "High (1500-2500mm)",
                "marketPrice": "₹280-320/quintal",
                "yield": "70-100 tons/hectare"
            },
            {
                "name": "Pulses (Arhar/Tur)",
                "type": "Pulse",
                "sowingPeriod": "Mid July",
                "harvestTime": "150-180 days",
                "varieties": ["ICPL-87119", "Maruti", "Vaibhav"],
                "waterRequirement": "Medium (600-800mm)",
                "marketPrice": "₹55-75/kg",
                "yield": "1.5-2.5 tons/hectare"
            },
            {
                "name": "Finger Millet",
                "type": "Millet",
                "sowingPeriod": "Late July",
                "harvestTime": "120-140 days",
                "varieties": ["GPU-28", "MR-6", "PR-202"],
                "waterRequirement": "Low-Medium (400-500mm)",
                "marketPrice": "₹25-35/kg",
                "yield": "2-3 tons/hectare"
            }
        ],
        "activities": [
            "Transplanting of paddy seedlings",
            "Weeding and fertilizer application",
            "Pest and disease monitoring",
            "Drainage management in heavy rainfall areas",
            "Inter-cultivation for row crops",
            "Foliar nutrition application"
        ],
        "challenges": [
            "Excess rainfall and flooding",
            "Nutrient leaching due to heavy rains",
            "Increased pest and disease pressure",
            "Soil erosion on sloped lands"
        ],
        "fertilizers": ["Top dressing urea", "Potash", "Micronutrient spray", "Bio-fertilizers"],
        "irrigationSchedule": "Monsoon dependent, drainage focus",
        "pestControl": ["Blast disease", "Bacterial leaf blight", "Stem borer management"],
        "marketTrends": "Planting season, focus on input quality and timing"
    },

    "August": {
        "month": "August",
        "name": "August",
        "season": "Monsoon/Mid-Kharif",
        "temperature": "25-30°C",
        "humidity": "75-85%",
        "rainfall": "150-300mm",
        "sowingMethod": "Late sowing, Gap filling",
        "crops": [
            {
                "name": "Black Gram",
                "type": "Pulse",
                "sowingPeriod": "Early August",
                "harvestTime": "75-90 days",
                "varieties": ["T-9", "Pant U-19", "Azad-3"],
                "waterRequirement": "Low-Medium (400-500mm)",
                "marketPrice": "₹65-85/kg",
                "yield": "1-1.5 tons/hectare"
            },
            {
                "name": "Sesame (Kharif)",
                "type": "Oil Seed",
                "sowingPeriod": "Mid August",
                "harvestTime": "85-100 days",
                "varieties": ["RT-127", "TKG-306", "Haritha"],
                "waterRequirement": "Medium (350-450mm)",
                "marketPrice": "₹70-90/kg",
                "yield": "0.6-1 tons/hectare"
            },
            {
                "name": "Late Sown Rice",
                "type": "Cereal",
                "sowingPeriod": "Throughout August",
                "harvestTime": "110-130 days",
                "varieties": ["Samba Mahsuri", "BPT-5204", "MTU-1010"],
                "waterRequirement": "High (1000-1300mm)",
                "marketPrice": "₹18-25/kg",
                "yield": "3.5-5 tons/hectare"
            },
            {
                "name": "Pearl Millet",
                "type": "Millet",
                "sowingPeriod": "Late August",
                "harvestTime": "75-90 days",
                "varieties": ["Pusa-23", "RHB-121", "Proagro-9444"],
                "waterRequirement": "Low (350-500mm)",
                "marketPrice": "₹18-25/kg",
                "yield": "2-3.5 tons/hectare"
            }
        ],
        "activities": [
            "Gap filling in rice fields",
            "Top dressing of nitrogen fertilizers",
            "Weed management in all crops",
            "Pest scouting and IPM practices",
            "Water level management in paddy",
            "Harvest of early Zaid crops"
        ],
        "challenges": [
            "Prolonged cloudy weather affecting photosynthesis",
            "Brown plant hopper attacks in rice",
            "Stem rot and other fungal diseases",
            "Uneven rainfall distribution"
        ],
        "fertilizers": ["Potassium chloride", "Ammonium sulphate", "Foliar zinc", "Fungicides"],
        "irrigationSchedule": "Rainfall dependent, water level management",
        "pestControl": ["Brown plant hopper", "Leaf folder", "Fungal disease control"],
        "marketTrends": "Mid-season, monitoring crop progress and market outlook"
    },

    "September": {
        "month": "September",
        "name": "September",
        "season": "Late Monsoon/Kharif Maturity",
        "temperature": "24-30°C",
        "humidity": "70-80%",
        "rainfall": "100-200mm",
        "sowingMethod": "Early Rabi preparation, Late Kharif completion",
        "crops": [
            {
                "name": "Mustard (Early)",
                "type": "Oil Seed",
                "sowingPeriod": "Late September",
                "harvestTime": "120-150 days",
                "varieties": ["Pusa Bold", "Rohini", "Varuna"],
                "waterRequirement": "Low-Medium (300-400mm)",
                "marketPrice": "₹40-55/kg",
                "yield": "1.8-2.5 tons/hectare"
            },
            {
                "name": "Potato (Early)",
                "type": "Tuber",
                "sowingPeriod": "Late September",
                "harvestTime": "90-110 days",
                "varieties": ["Kufri Jyoti", "Kufri Pukhraj", "Kufri Chandramukhi"],
                "waterRequirement": "Medium (500-700mm)",
                "marketPrice": "₹15-25/kg",
                "yield": "25-35 tons/hectare"
            },
            {
                "name": "Radish",
                "type": "Root Vegetable",
                "sowingPeriod": "Throughout September",
                "harvestTime": "45-60 days",
                "varieties": ["Pusa Chetki", "Japanese White", "Pusa Himani"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹12-20/kg",
                "yield": "20-30 tons/hectare"
            },
            {
                "name": "Coriander",
                "type": "Spice/Herb",
                "sowingPeriod": "Mid to Late September",
                "harvestTime": "90-120 days",
                "varieties": ["Pant Haritima", "Rajendra Swathi", "Gujarat Coriander-2"],
                "waterRequirement": "Low-Medium (350-450mm)",
                "marketPrice": "₹60-100/kg",
                "yield": "1.5-2 tons/hectare"
            }
        ],
        "activities": [
            "Harvest early maturing Kharif crops",
            "Land preparation for Rabi season",
            "Storage preparation for harvested crops",
            "Soil testing for next season planning",
            "Seed procurement for Rabi crops",
            "Equipment maintenance and repair"
        ],
        "challenges": [
            "Post-monsoon pest outbreaks",
            "Grain drying issues due to humidity",
            "Market glut of Kharif produce",
            "Preparing fields while managing standing crops"
        ],
        "fertilizers": ["Basal fertilizers for Rabi", "Organic compost", "Lime application", "Micronutrients"],
        "irrigationSchedule": "Transition from monsoon to irrigation",
        "pestControl": ["Post-harvest pest management", "Storage pest control", "Field sanitation"],
        "marketTrends": "Harvest season, price volatility expected"
    },

    "October": {
        "month": "October",
        "name": "October",
        "season": "Post-Monsoon/Rabi Sowing",
        "temperature": "22-32°C",
        "humidity": "60-75%",
        "rainfall": "20-80mm",
        "sowingMethod": "Direct seeding, Broadcasting, Line sowing",
        "crops": [
            {
                "name": "Wheat",
                "type": "Cereal",
                "sowingPeriod": "Mid to Late October",
                "harvestTime": "120-150 days",
                "varieties": ["HD-2967", "PBW-550", "DBW-88"],
                "waterRequirement": "Medium (450-650mm)",
                "marketPrice": "₹19-23/kg",
                "yield": "4-5.5 tons/hectare"
            },
            {
                "name": "Barley",
                "type": "Cereal",
                "sowingPeriod": "Throughout October",
                "harvestTime": "110-130 days",
                "varieties": ["PL-426", "RD-2552", "JB-58"],
                "waterRequirement": "Low-Medium (450-550mm)",
                "marketPrice": "₹16-20/kg",
                "yield": "3.5-4.5 tons/hectare"
            },
            {
                "name": "Gram/Chickpea",
                "type": "Pulse",
                "sowingPeriod": "Mid October",
                "harvestTime": "120-140 days",
                "varieties": ["Pusa-256", "KAK-2", "JG-11"],
                "waterRequirement": "Low (300-400mm)",
                "marketPrice": "₹45-65/kg",
                "yield": "1.5-2.5 tons/hectare"
            },
            {
                "name": "Lentil",
                "type": "Pulse",
                "sowingPeriod": "Late October",
                "harvestTime": "120-140 days",
                "varieties": ["PL-234", "K-75", "DPL-15"],
                "waterRequirement": "Low-Medium (350-450mm)",
                "marketPrice": "₹60-80/kg",
                "yield": "1.2-1.8 tons/hectare"
            }
        ],
        "activities": [
            "Complete harvesting of Kharif crops",
            "Field preparation for Rabi sowing",
            "Apply basal fertilizers",
            "Begin sowing of Rabi crops",
            "Set up winter irrigation systems",
            "Plan crop rotation schedules"
        ],
        "challenges": [
            "Delayed monsoon withdrawal",
            "Soil moisture management for germination",
            "Pest carryover from Kharif season",
            "Timely availability of quality seeds"
        ],
        "fertilizers": ["DAP", "NPK complex", "Urea", "Phosphorus-rich fertilizers"],
        "irrigationSchedule": "Pre-sowing irrigation, then every 20-25 days",
        "pestControl": ["Termite control", "Cutworm management", "Aphid monitoring"],
        "marketTrends": "Rabi sowing season, input procurement focus"
    },

    "November": {
        "month": "November",
        "name": "November",
        "season": "Early Winter/Rabi Establishment",
        "temperature": "18-28°C",
        "humidity": "55-70%",
        "rainfall": "5-25mm",
        "sowingMethod": "Transplanting, Direct seeding, Broadcasting",
        "crops": [
            {
                "name": "Broccoli",
                "type": "Vegetable",
                "sowingPeriod": "Early November",
                "harvestTime": "80-100 days",
                "varieties": ["Palam Samridhi", "KTS-1", "Premium Crop"],
                "waterRequirement": "High (500-600mm)",
                "marketPrice": "₹40-60/kg",
                "yield": "12-18 tons/hectare"
            },
            {
                "name": "Oats",
                "type": "Cereal/Fodder",
                "sowingPeriod": "Throughout November",
                "harvestTime": "90-110 days",
                "varieties": ["JHO-822", "Kent", "UPO-94"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹15-20/kg",
                "yield": "30-40 tons/hectare (green fodder)"
            },
            {
                "name": "Fenugreek",
                "type": "Spice/Leafy Vegetable",
                "sowingPeriod": "Mid November",
                "harvestTime": "120-150 days",
                "varieties": ["Pusa Early Bunching", "Kasturi", "RMt-303"],
                "waterRequirement": "Low-Medium (350-450mm)",
                "marketPrice": "₹80-120/kg (leaves), ₹40-60/kg (seeds)",
                "yield": "1.5-2.5 tons/hectare"
            },
            {
                "name": "Garlic",
                "type": "Spice/Bulb Vegetable",
                "sowingPeriod": "Late November",
                "harvestTime": "150-180 days",
                "varieties": ["G-1", "G-50", "Godavari Late"],
                "waterRequirement": "Medium (450-550mm)",
                "marketPrice": "₹80-150/kg",
                "yield": "8-12 tons/hectare"
            }
        ],
        "activities": [
            "Complete sowing of late Rabi crops",
            "First irrigation for wheat and barley",
            "Apply organic fertilizers",
            "Weed control in early sown crops",
            "Pest monitoring in vegetable crops",
            "Prepare for winter protection measures"
        ],
        "challenges": [
            "Early frost damage risk",
            "Soil compaction after harvest",
            "Germination issues due to dry weather",
            "Increasing pest pressure on young crops"
        ],
        "fertilizers": ["NPK 10:26:26", "Single super phosphate", "Potash", "Organic manure"],
        "irrigationSchedule": "Every 15-20 days",
        "pestControl": ["Cutworm control", "Aphid management", "Fungal disease prevention"],
        "marketTrends": "Winter vegetable season begins, good demand expected"
    },

    "December": {
        "month": "December",
        "name": "December",
        "season": "Winter/Mid-Rabi",
        "temperature": "12-22°C",
        "humidity": "60-75%",
        "rainfall": "10-30mm",
        "sowingMethod": "Protected cultivation, Greenhouse growing",
        "crops": [
            {
                "name": "Strawberry",
                "type": "Fruit",
                "sowingPeriod": "Early December (planting)",
                "harvestTime": "60-90 days",
                "varieties": ["Chandler", "Sweet Charlie", "Festival"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹200-400/kg",
                "yield": "15-25 tons/hectare"
            },
            {
                "name": "Lettuce",
                "type": "Leafy Vegetable",
                "sowingPeriod": "Throughout December",
                "harvestTime": "45-65 days",
                "varieties": ["Great Lakes", "Iceberg", "Butterhead"],
                "waterRequirement": "Medium (350-450mm)",
                "marketPrice": "₹50-80/kg",
                "yield": "12-20 tons/hectare"
            },
            {
                "name": "Safflower",
                "type": "Oil Seed",
                "sowingPeriod": "Early December",
                "harvestTime": "120-150 days",
                "varieties": ["A-1", "NARI-6", "PBNS-12"],
                "waterRequirement": "Low (300-400mm)",
                "marketPrice": "₹45-65/kg",
                "yield": "1.2-1.8 tons/hectare"
            },
            {
                "name": "Field Pea",
                "type": "Pulse",
                "sowingPeriod": "Mid December",
                "harvestTime": "100-120 days",
                "varieties": ["Pusa Prabhat", "HUP-2", "KPMR-400"],
                "waterRequirement": "Medium (400-500mm)",
                "marketPrice": "₹40-55/kg",
                "yield": "2-3 tons/hectare"
            }
        ],
        "activities": [
            "Winter irrigation scheduling",
            "Frost protection measures",
            "Apply nitrogenous fertilizers to wheat",
            "Pest and disease monitoring",
            "Harvesting of early winter vegetables",
            "Plan for next season crop rotation"
        ],
        "challenges": [
            "Severe frost damage to sensitive crops",
            "Water scarcity in some regions",
            "Fog affecting plant growth",
            "Market price volatility during harvest"
        ],
        "fertilizers": ["Urea top dressing", "Potassium sulphate", "Calcium nitrate", "Micronutrient spray"],
        "irrigationSchedule": "Every 25-30 days for cereals, every 7-10 days for vegetables",
        "pestControl": ["Aphid control", "Rust disease management", "Frost protection"],
        "marketTrends": "Premium winter produce, festival demand drives prices"
    }
};

// Function to integrate the enhanced calendar with existing functionality
function loadEnhancedCropCalendar() {
    console.log('Loading enhanced crop calendar with all 12 months...');

    // Re-render month cards with enhanced data
    if (typeof renderMonthCards === 'function') {
        renderMonthCards();
    }

    // Update any existing UI elements
    console.log('Enhanced crop calendar loaded successfully!');
    console.log('Available months:', Object.keys(window.enhancedCropCalendar));

    return window.enhancedCropCalendar;
}

// Auto-load the enhanced calendar when script is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadEnhancedCropCalendar();
});

// Make the function globally available
window.loadEnhancedCropCalendar = loadEnhancedCropCalendar;

console.log('Enhanced Agricultural Calendar 2025 script loaded - All 12 months available');
