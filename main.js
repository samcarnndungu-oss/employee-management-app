// ===== NEW CONTACT PAGE LOGIC =====
const contactForm = document.getElementById('contactForm');
const minDOB = new Date('2007-01-01'); // must be 18+

if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();

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
            dob: dob.toISOString().split('T')[0],
            position
        };

        // Save to localStorage
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        alert('Contact added successfully!');
        contactForm.reset();

        // 🔥 Redirect to view contacts page
        window.location.href = 'view_contact.html';
    });

    // ID field: only numbers
    const idInput = document.getElementById('idNumber');
    idInput.addEventListener('input', () => {
        idInput.value = idInput.value.replace(/\D/g,'');
    });
}

// ===== VIEW CONTACTS PAGE LOGIC =====
const contactsTableBody = document.querySelector('#contactsTable tbody');

function loadContacts(){
    if(!contactsTableBody) return; // only run if on view_contact.html

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contactsTableBody.innerHTML = '';

    contacts.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c.idNumber}</td>
            <td>${c.fullName}</td>
            <td>${c.gender}</td>
            <td>${c.address}</td>
            <td>${c.dob}</td>
            <td>${c.position}</td>
            <td>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
                <button onclick="showDetails(${index})">Details</button>
            </td>
        `;
        contactsTableBody.appendChild(row);
    });
}

// Run only if on view_contact.html
loadContacts();

// DELETE CONTACT
function deleteContact(index){
    if(confirm("Are you sure you want to delete this contact?")){
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.splice(index,1);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
    }
}

// SHOW DETAILS
function showDetails(index){
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const c = contacts[index];
    alert(
        `ID: ${c.idNumber}\n`+
        `Name: ${c.fullName}\n`+
        `Gender: ${c.gender}\n`+
        `Address: ${c.address}\n`+
        `Date of Birth: ${c.dob}\n`+
        `Position: ${c.position}`
    );
}

// EDIT CONTACT
function editContact(index){
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const c = contacts[index];

    const newName = prompt('Enter new full name:', c.fullName);
    if(newName) c.fullName = newName;

    const newGender = prompt('Enter new gender (Male/Female):', c.gender);
    if(newGender) c.gender = newGender;

    const newAddress = prompt('Enter new address:', c.address);
    if(newAddress) c.address = newAddress;

    const newDOB = prompt('Enter new Date of Birth (YYYY-MM-DD):', c.dob);
    if(newDOB){
        const dobDate = new Date(newDOB);
        if(dobDate > minDOB){
            alert("User must be at least 18 years old!");
        } else {
            c.dob = newDOB;
        }
    }

    const newPosition = prompt('Enter new position:', c.position);
    if(newPosition) c.position = newPosition;

    contacts[index] = c;
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}