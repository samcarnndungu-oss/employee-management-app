// ==============================
// NEW CONTACT PAGE LOGIC
// ==============================
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

// ==============================
// VIEW CONTACTS PAGE LOGIC
// ==============================
const contactsTableBody = document.querySelector('#contactsTable tbody');

function loadContacts(){
    if(!contactsTableBody) return;

    contactsTableBody.innerHTML = '';
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    contacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.idNumber}</td>
            <td>${contact.fullName}</td>
            <td>${contact.gender}</td>
            <td>${contact.address}</td>
            <td>${contact.dob}</td>
            <td>${contact.position}</td>
            <td>
                <button onclick="editRow(${index})">Edit</button>
                <button onclick="deleteRow(${index})">Delete</button>
                <button onclick="showDetails(${index})">Details</button>
            </td>
        `;
        contactsTableBody.appendChild(row);
    });
}

loadContacts();

// ==============================
// DELETE CONTACT
// ==============================
function deleteRow(index){
    if(confirm("Are you sure you want to delete this contact?")){
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.splice(index, 1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    }
}

// ==============================
// SHOW DETAILS
// ==============================
function showDetails(index){
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];
    alert(
        `ID: ${contact.idNumber}\n` +
        `Name: ${contact.fullName}\n` +
        `Gender: ${contact.gender}\n` +
        `Address: ${contact.address}\n` +
        `Date of Birth: ${contact.dob}\n` +
        `Position: ${contact.position}`
    );
}

// ==============================
// EDIT CONTACT
// ==============================
function editRow(index){
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];

    const newName = prompt('Enter new full name:', contact.fullName);
    if(newName) contact.fullName = newName;

    const newGender = prompt('Enter new gender (Male/Female):', contact.gender);
    if(newGender) contact.gender = newGender;

    const newAddress = prompt('Enter new address:', contact.address);
    if(newAddress) contact.address = newAddress;

    const newDOB = prompt('Enter new Date of Birth (YYYY-MM-DD):', contact.dob);
    if(newDOB){
        const dobDate = new Date(newDOB);
        if(dobDate > minDOB){
            alert("User must be at least 18 years old!");
        } else {
            contact.dob = newDOB;
        }
    }

    const newPosition = prompt('Enter new position:', contact.position);
    if(newPosition) contact.position = newPosition;

    contacts[index] = contact;
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}