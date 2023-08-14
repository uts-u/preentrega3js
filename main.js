document.addEventListener('DOMContentLoaded', function () {
  const budgetForm = document.getElementById('budget-form');
  const resultContainer = document.getElementById('result');
  const budgetInput = document.getElementById('budget');
  const cardsContainer = document.getElementById('cards-container');
  
  budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const budget = parseFloat(budgetInput.value);
  
    if (isNaN(budget)) {
      alert('por favor introduce tu presupuesto (entre 500 y mas de 5000 dolares).');
      return;
    }
  
    saveBudgetToLocalStorage(budget);
    updateOptions(budget);
  });
  
  function saveBudgetToLocalStorage(budget) {
    localStorage.setItem('homestudioBudget', budget);
  }
  
  function loadBudgetFromLocalStorage() {
    return parseFloat(localStorage.getItem('homestudioBudget'));
  }
  
  function updateOptions(budget) {
    resultContainer.classList.remove('hidden');
  
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.style.display = 'none';
    });
  
    let optionId = '';
  
    if (budget < 1000) {
      optionId = 'option-1';
      showAlertAndConsole("Homestudio basico", "Equipamiento básico");
    } else if (budget >= 1000 && budget < 2000) {
      optionId = 'option-2';
      showAlertAndConsole("Homestudio Estandar", "Equipamiento estándar");
    } else if (budget >= 2000 && budget < 5000) {
      optionId = 'option-3';
      showAlertAndConsole("homestudio avanzado", "Equipamiento avanzado");
    } else {
      optionId = 'option-4';
      showAlertAndConsole("Homestudio profesional", "Equipamiento profesional");
    }
  
    const selectedOption = document.getElementById(optionId);
    selectedOption.style.display = 'block';
  }

  function showAlertAndConsole(alertText, consoleText) {
    alert(alertText);
    console.log(consoleText);

    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = consoleText;
    cardsContainer.appendChild(card);
  }
  
  // Load budget from LocalStorage on page load
  const savedBudget = loadBudgetFromLocalStorage();
  if (!isNaN(savedBudget)) {
    budgetInput.value = savedBudget;
  }
});
