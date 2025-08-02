// Variables globales
let currentStep = 1;
const totalSteps = 4;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    updateCharacterCounters();
});

function initializeForm() {
    updateProgressBar();
    updateStepIndicators();
}

function setupEventListeners() {
    // Navigation
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('prevBtn').addEventListener('click', prevStep);

    // FAQ toggles
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });

    // Character counters
    document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
        textarea.addEventListener('input', updateCharacterCounter);
    });

    // Form validation
    document.getElementById('projectForm').addEventListener('submit', handleSubmit);
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });

    // Show current step
    document.getElementById(`step${step}`).classList.add('active');

    // Update navigation buttons
    updateNavigationButtons();
    updateProgressBar();
    updateStepIndicators();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.style.display = currentStep > 1 ? 'flex' : 'none';

    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const percentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${percentage}%`;
}

function updateStepIndicators() {
    for (let i = 1; i <= totalSteps; i++) {
        const indicator = document.getElementById(`step${i}-indicator`);
        if (i <= currentStep) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    }
}

function validateCurrentStep() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showError(field, 'Ce champ est requis');
            isValid = false;
        } else {
            hideError(field);
        }
    });

    return isValid;
}

function showError(field, message) {
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
    field.style.borderColor = '#ef4444';
}

function hideError(field) {
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) {
        errorEl.style.display = 'none';
    }
    field.style.borderColor = 'var(--border-light)';
}

function updateCharacterCounter(event) {
    const textarea = event.target;
    const maxLength = textarea.maxLength;
    const currentLength = textarea.value.length;
    const counterId = `${textarea.id}-count`;
    const counter = document.getElementById(counterId);

    if (counter) {
        counter.textContent = `${currentLength}/${maxLength} caractères`;
    }
}

function updateCharacterCounters() {
    document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
        updateCharacterCounter({
            target: textarea
        });
    });
}

function toggleFAQ(event) {
    const faqItem = event.currentTarget.closest('.faq-item');
    faqItem.classList.toggle('active');
}

function handleSubmit(event) {
    event.preventDefault();

    if (!validateCurrentStep()) {
        return;
    }

    // Simulation de soumission
    const submitBtn = document.getElementById('submitBtn');
    const spinner = submitBtn.querySelector('.loading-spinner');

    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';

    setTimeout(() => {
        alert('Projet soumis avec succès ! Vous recevrez une confirmation par email.');
        submitBtn.disabled = false;
        spinner.style.display = 'none';
    }, 2000);
}