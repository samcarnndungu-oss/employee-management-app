<script>
function deleteRow(btn){
    let confirmAction = confirm("Are you sure you want to delete this contact?");
    
    if(confirmAction){
        let row = btn.closest("tr");
        row.remove();
    }
}

function showDetails(btn){
    let row = btn.closest("tr");

    let name = row.cells[1].innerText;
    let phone = row.cells[2].querySelector("input").value;
    let email = row.cells[3].querySelector("input").value;

    alert(
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email
    );
}

function editRow(btn){
    let row = btn.closest("tr");

    let choice = prompt("What do you want to edit? (name / phone / email)");

    if(choice === "name"){
        let newName = prompt("Enter new name:");
        if(newName) row.cells[1].innerText = newName;
    }
    else if(choice === "phone"){
        let newPhone = prompt("Enter new phone:");
        if(newPhone) row.cells[2].querySelector("input").value = newPhone;
    }
    else if(choice === "email"){
        let newEmail = prompt("Enter new email:");
        if(newEmail) row.cells[3].querySelector("input").value = newEmail;
    }
    else{
        alert("Invalid choice!");
    }
}

</script>