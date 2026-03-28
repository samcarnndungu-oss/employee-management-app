// NEW CONTACT PAGE LOGIC
const contactForm = document.getElementById('contactForm');

// Minimum DOB allowed: 18+ (born on or before 01/01/2007)
const minDOB = new Date('2007-01-01');

if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault(); // prevent form submission

        const idNumber = document.getElementById('idNumber').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const address = document.getElementById('address').value.trim();
        const dobInput = document.getElementById('dob').value;
        const position = document.getElementById('position').value.trim();

        if(!dobInput){
            alert('Please enter your date of birth.');
            return;
        }

        const dob = new Date(dobInput);
        if(dob > minDOB){
            alert('Sorry! You must be at least 18 years old to register.');
            return;
        }

        const contact = {
            idNumber,
            fullName: `${firstName} ${lastName}`,
            gender,
            address,
            dob: dob.toISOString().split('T')[0], // YYYY-MM-DD
            position
        };

        // Save contact to localStorage
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        alert('Contact added successfully!');
        contactForm.reset();
    });
}