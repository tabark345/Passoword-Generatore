document.addEventListener('DOMContentLoaded', () => {
    const passwordOutput = document.getElementById('passwordOutput');
    const lengthRange = document.getElementById('lengthRange');
    const lengthValue = document.getElementById('lengthValue');
    const includeUppercase = document.getElementById('includeUppercase');
    const includeLowercase = document.getElementById('includeLowercase');
    const includeNumbers = document.getElementById('includeNumbers');
    const includeSymbols = document.getElementById('includeSymbols');
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const strengthIndicator = document.getElementById('strengthIndicator');
    
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+[]{}<>?/";
    
        // Update length value display
        lengthRange.addEventListener('input', () => {
        lengthValue.textContent = lengthRange.value;
        });
    
        // Generate password
        generateButton.addEventListener('click', () => {
        const length = parseInt(lengthRange.value);
        const charPool = getCharacterPool();
    
        if (!charPool) {
            alert("Please select at least one character type!");
            return;
        }
    
        const password = Array.from({ length }, () => {
            return charPool[Math.floor(Math.random() * charPool.length)];
        }).join("");
    
        passwordOutput.value = password;
        updateStrengthIndicator(password);
        });
    
        // Copy to clipboard
        copyButton.addEventListener('click', () => {
        if (passwordOutput.value) {
            navigator.clipboard.writeText(passwordOutput.value);
            alert("Password copied to clipboard!");
        }
        });
    
        // Get character pool
        function getCharacterPool() {
        let pool = "";
        if (includeUppercase.checked) pool += uppercaseChars;
        if (includeLowercase.checked) pool += lowercaseChars;
        if (includeNumbers.checked) pool += numberChars;
        if (includeSymbols.checked) pool += symbolChars;
        return pool;
        }
    
        // Update strength indicator
        function updateStrengthIndicator(password) {
        const length = password.length;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\[\]{}<>?/]/.test(password);
    
        let strengthClass = "weak";
        if (length >= 12 && hasUpper && hasLower && hasNumber && hasSymbol) {
            strengthClass = "strong";
        } else if (length >= 8 && (hasUpper || hasLower) && (hasNumber || hasSymbol)) {
            strengthClass = "medium";
        }
    
        strengthIndicator.className = `strength-bar ${strengthClass}`;
        }
    });
    