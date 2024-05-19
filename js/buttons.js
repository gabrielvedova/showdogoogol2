// Create help buttons
const helpButton1 = document.getElementById('helpButton1');
helpButton1.textContent = "Ajuda 1";
helpButton1.addEventListener("click", () => {
  // Add logic for help 1 here
});

const helpButton2 = document.getElementById('helpButton2');
helpButton2.textContent = "Ajuda 2";
helpButton2.addEventListener("click", () => {
  // Add logic for help 2 here
});

const helpButton3 = document.getElementById('helpButton3');
helpButton3.textContent = "Ajuda 3";
helpButton3.addEventListener("click", () => {
  // Add logic for help 3 here
});

// Append buttons to a container in the HTML document
const helpButtonsContainer = document.getElementById("boost");
helpButtonsContainer.appendChild(helpButton1);
helpButtonsContainer.appendChild(helpButton2);
helpButtonsContainer.appendChild(helpButton3);