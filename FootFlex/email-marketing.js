// Wait for the document to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    const emailForm = document.getElementById('em-emailForm');
    const submitBtn = document.getElementById('em-submitBtn');
    const successMsg = document.getElementById('em-success-msg');

    // Check if the form exists on the page to avoid errors
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            // 1. Prevent the page from refreshing
            e.preventDefault();

            // 2. Provide visual feedback on the button
            submitBtn.innerText = "Joining...";
            submitBtn.disabled = true;

            // 3. Simulate a delay (like a real server request)
            setTimeout(() => {
                // Hide the form smoothly
                emailForm.style.display = 'none'; 
                
                // Show the success message
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
            }, 1000);
        });
    }
});