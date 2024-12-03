const form = document.getElementById('form');
const mortgageAmount = document.getElementById('mortgageAmount');
const mortgageTerm = document.getElementById('mortgageTerm');
const interestRate = document.getElementById('interestRate');
const calcBtn = document.getElementById('calc-btn');
const resultsSideEmpty = document.getElementById('results-side-empty');
const resultsSideCompleted = document.getElementById('results-side-completed');

function showError(input,message){
    const inputContainer = input.parentElement;
    const formControl = inputContainer.parentElement;
    formControl.className = ('form-control error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}
function showSuccess(input){
    const inputContainer = input.parentElement;
    const formControl = inputContainer.parentElement;
    formControl.className = 'form-control success';
}
function calcRepayment(){
    const p = mortgageAmount.value;
    const i = interestRate.value / 100 / 12;
    const n = mortgageTerm.value * 12;
    const interestOnlyPaymnet = (p * i).toFixed(2);
    const monthlyPayment = (p * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)).toFixed(2);
    const repaymentTotal = (monthlyPayment * n).toFixed(2);
    const interestOnlyTotal = (interestOnlyPaymnet * n).toFixed(2);
    
    
    if(document.getElementById('radio-Repayment').checked){
        //Repayment Radio selected
        document.getElementById('monthly-repayments-total').innerHTML = `$ ${monthlyPayment}`;
        document.getElementById('term-repayments-total').innerHTML = `$ ${repaymentTotal}`;
        console.log(monthlyPayment)
        


    }else if(document.getElementById('radio-Interest').checked){
        //Interest radio Selected
        document.getElementById('monthly-repayments-total').innerHTML = `$ ${interestOnlyPaymnet}`;
        document.getElementById('term-repayments-total').innerHTML = `No Total for Interest Only`;
        console.log(interestOnlyPaymnet)
        
    } 
    
}

function toggleCard(){
    if(isValid){
        resultsSideEmpty.style.display = 'none';
        resultsSideCompleted.style.display = 'flex'
    };
}


calcBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isValid = true;
    if(mortgageAmount.value === ''){
        isValid = false;
        showError(mortgageAmount,'Please Enter a Mortgage Amount');
    }else{
        showSuccess(mortgageAmount)
    };
    if(mortgageTerm.value === ''){
        isValid = false;
        showError(mortgageTerm, 'Please enter a Mortgage Term ');
    }else{
        showSuccess(mortgageTerm);
    }
    if(interestRate.value === ''){
        isValid = false;
        showError(interestRate, 'Please enter an Interest Rate ');
    }else{
        showSuccess(interestRate);
    }
    calcRepayment();
    toggleCard();

});
