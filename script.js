// --- Modal Logic ---
const modal = document.getElementById('quoteModal');
const formStatus = document.getElementById('form-status');

function openModal() {
    modal.style.display = "block";
    formStatus.textContent = ''; // Clear previous status on open
    formStatus.style.color = 'green'; // Reset color
}

function closeModal() {
    modal.style.display = "none";
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// --- Mobile Menu Logic ---
const mobileMenu = document.getElementById('mobileMenu');
const body = document.body;

function toggleMenu() {
    if (mobileMenu.style.width === "100%") {
        mobileMenu.style.width = "0";
        body.style.overflow = "auto";
    } else {
        mobileMenu.style.width = "100%";
        body.style.overflow = "hidden"; // Prevents background scrolling
    }
}


// --- Form Submission Logic (Formspree AJAX) ---

const form = document.getElementById('quoteForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop default form submission
    
    const formData = new FormData(form);
    // Gets the Formspree URL from the form's action attribute (e.g., https://formspree.io/f/mrbyyqog)
    const formUrl = form.getAttribute('action'); 
    
    // Show loading status
    formStatus.textContent = 'Submitting request...';
    formStatus.style.color = 'orange';
    
    try {
        const response = await fetch(formUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = 'Quote Request Sent! We will call you within 15 minutes.';
            formStatus.style.color = 'green';
            form.reset();
            // Close modal after a short delay for user confirmation
            setTimeout(closeModal, 3000); 
        } else {
            // Handle error response from Formspree
            formStatus.textContent = 'Error sending request. Please call us directly at 98488 15056.';
            formStatus.style.color = 'red';
        }
    } catch (error) {
        // Handle network errors
        formStatus.textContent = 'Network error. Please check your connection or call us at 98488 15056.';
        formStatus.style.color = 'red';
    }
});