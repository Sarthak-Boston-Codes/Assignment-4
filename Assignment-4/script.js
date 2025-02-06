document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = form.querySelector("input[type='Submit']");
    const inputs = form.querySelectorAll("input, textarea");
    
    submitButton.disabled = true;

    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.type !== "submit" && input.type !== "reset") {
                let errorSpan = document.getElementById(input.id + "-error");
                if (!errorSpan) {
                    errorSpan = document.createElement("span");
                    errorSpan.id = input.id + "-error";
                    errorSpan.style.color = "red";
                    input.parentNode.insertBefore(errorSpan, input.nextSibling);
                }
                
                if (input.value.trim() === "") {
                    errorSpan.textContent = "This field is required.";
                    isValid = false;
                } else if (input.hasAttribute("minlength") && input.value.length < input.getAttribute("minlength")) {
                    errorSpan.textContent = `Minimum length is ${input.getAttribute("minlength")} characters.`;
                    isValid = false;
                } else if (input.hasAttribute("maxlength") && input.value.length > input.getAttribute("maxlength")) {
                    errorSpan.textContent = `Maximum length is ${input.getAttribute("maxlength")} characters.`;
                    isValid = false;
                } else if (input.dataset.validation === "alphanumeric" && /[^a-zA-Z0-9]/.test(input.value)) {
                    errorSpan.textContent = "Only alphanumeric characters are allowed.";
                    isValid = false;
                } else if (input.id === "phoneNumber" && !/^\(\d{3}\) \d{3}-\d{4}$/.test(input.value)) {
                    errorSpan.textContent = "Phone number must be in format (XXX) XXX-XXXX.";
                    isValid = false;
                } else if (input.id === "emailId" && !/^\w+@northeastern\.edu$/.test(input.value)) {
                    errorSpan.textContent = "Email must be a @northeastern.edu address.";
                    isValid = false;
                } else if (input.id === "zipcode" && !/^\d{5}$/.test(input.value)) {
                    errorSpan.textContent = "Zip code must be 5 digits.";
                    isValid = false;
                } else {
                    errorSpan.textContent = "";
                }
            }
        });

        submitButton.disabled = !isValid;
    }

    inputs.forEach(input => {
        if (input.type !== "submit" && input.type !== "reset") {
            input.addEventListener("input", validateForm);
        }
    });

    // Adding a single select list box with 5 elements
    const selectList = document.createElement("select");
    selectList.id = "selectBox";
    form.appendChild(selectList);
    
    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        selectList.appendChild(opt);
    });

    // Adding onChange event for select list to create a dynamic checkbox
    selectList.addEventListener("change", function () {
        let checkboxContainer = document.getElementById("checkboxContainer");
        if (!checkboxContainer) {
            checkboxContainer = document.createElement("div");
            checkboxContainer.id = "checkboxContainer";
            form.appendChild(checkboxContainer);
        }
        
        checkboxContainer.innerHTML = "";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "dynamicCheckbox";
        checkboxContainer.appendChild(checkbox);
        
        const label = document.createElement("label");
        label.textContent = ` Enable additional input for ${selectList.value}`;
        checkboxContainer.appendChild(label);
        
        checkbox.addEventListener("change", function () {
            let textField = document.getElementById("dynamicTextField");
            if (checkbox.checked) {
                if (!textField) {
                    textField = document.createElement("input");
                    textField.type = "text";
                    textField.id = "dynamicTextField";
                    textField.placeholder = `Enter details for ${selectList.value}`;
                    checkboxContainer.appendChild(textField);
                }
            } else {
                if (textField) {
                    textField.remove();
                }
            }
        });
    });

    // Adding optional Street Address 2 field inside a container div with live character counter
    const streetAddress2Container = document.createElement("div");
    streetAddress2Container.id = "streetAddress2Container";
    
    const streetAddress2Label = document.createElement("label");
    streetAddress2Label.textContent = "Street Address 2:";
    streetAddress2Label.setAttribute("for", "streetAddress2");
    
    const streetAddress2 = document.createElement("input");
    streetAddress2.type = "text";
    streetAddress2.id = "streetAddress2";
    streetAddress2.placeholder = "Street Address 2 (Optional)";
    
    const charCounter = document.createElement("span");
    charCounter.id = "charCounter";
    charCounter.style.marginLeft = "10px";
    charCounter.textContent = "0/20 characters used";
    
    streetAddress2.addEventListener("input", function () {
        charCounter.textContent = `${streetAddress2.value.length}/20 characters used`;
    });
    
    streetAddress2Container.appendChild(streetAddress2Label);
    streetAddress2Container.appendChild(streetAddress2);
    streetAddress2Container.appendChild(charCounter);
    
    form.appendChild(streetAddress2Container);
    form.appendChild(document.createElement("br"));
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        let table = document.getElementById("submissionTable");
        
        if (!table) {
            table = document.createElement("table");
            table.id = "submissionTable";
            table.border = "1";
            document.body.appendChild(table);
        }
        
        const row = table.insertRow();
        formData.forEach((value, key) => {
            const cell = row.insertCell();
            cell.textContent = value || ""; // If field is blank, display blank
        });
        
        form.reset();
        submitButton.disabled = true;
        charCounter.textContent = "0/20 characters used";
    });
});
