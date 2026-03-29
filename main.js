// VIEW CONTACTS PAGE LOGIC (LIVE UPDATE)
const contactsTableBody = document.querySelector('#contactsTable tbody');

// Function to load contacts into the table
function loadContacts(){
    if(!contactsTableBody) return;

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
                <button class="edit" onclick="editContact(${index})">Edit</button>
                <button class="delete" onclick="deleteContact(${index})">Delete</button>
                <button class="details" onclick="showDetails(${index})">Details</button>
            </td>
        `;
        contactsTableBody.appendChild(row);
    });
}

// Initial load
loadContacts();

// Listen for localStorage changes (live update if contacts are added from another tab/page)
window.addEventListener('storage', function(e){
    if(e.key === 'contacts'){
        loadContacts();
    }
});

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
        const minDOB = new Date('2007-01-01');
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