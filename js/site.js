//Calculate the payment for the loan

function calcPayment(loanAmount, rate, term) {
    return (loanAmount * rate) / (1 - Math.pow(1 + rate, -term));
}

//calculate the interst for the current balance of the loan

function calcInterest(balance, rate) {
    return balance * rate;
}

//convert rate to a monthly interest rate

function calcRate() {
    let rate = parseFloat(document.getElementById("interestRate").value);
    return rate = rate / 1200;
}

function buildSchedule() {
    let loanAmount = Number(document.getElementById("loanBalance").value);
    let term = parseInt(document.getElementById("paymentTimeline").value);
    let rate = calcRate();

    //Assume monthly input

    let payment = calcPayment(loanAmount, rate, term);
    let payments = getPayments(loanAmount, rate, term, payment);

    displayData(payments, loanAmount, payment);
}

function getPayments(loanAmount, rate, term, payment) {

    let payments = [];

    let balance = loanAmount;
    let totalInterest = 0;
    let monthlyInterest = 0;
    let monthlyPrincipal = 0;
    let monthlyTotalInterest = 0;

    for (month = 1; month <= term; month++) {
        monthlyInterest = calcInterest(balance, rate);
        totalInterest += monthlyInterest;
        monthlyPrincipal = payment - monthlyInterest;
        balance = Math.abs(balance - monthlyPrincipal);

        //

        let curPayment = {
            month: month,
            payment: payment,
            principal: monthlyPrincipal,
            interest: monthlyInterest,
            totalInterest: totalInterest,
            balance: balance
        }

        payments.push(curPayment);

    }

    return payments;

}

function displayData(payments, loanAmount, payment) {

    //get the table we are going to add to.

    let tableBody = document.getElementById("calculatorBody");
    let template = document.getElementById("calculatorTemplate");

    //clear the table for previous calculations

    tableBody.innerHTML = "";
    
    document.getElementById("topPayment").innerText = "$" + payment

    //document.getElementById("topPrincipal").innerText = "$" + payments.map ( => )
    //document.getElementById("topInterest").innerText = "$" + totalInterest
    //document.getElementById("topCost").innerText = "$" + (loanAmount + totalInterest)

    data.map(x => x.value)

    //configure currency formatter.

    var currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    for (let i = 0; i < payments.length; i++) {

        //get a clone row template

        payRow = template.content.cloneNode(true);

        //grab only the columns in the template
        
        paycols = payRow.querySelectorAll("td");
        
        //build the row

        //we know that there are six columns in our template
        
        paycols[0].textContent = payments[i].month;

        paycols[1].textContent = currencyFormatter.format(payments[i].payment.toFixed(2));
        paycols[2].textContent = currencyFormatter.format(payments[i].principal.toFixed(2));
        paycols[3].textContent = currencyFormatter.format(payments[i].interest.toFixed(2));
        paycols[4].textContent = currencyFormatter.format(payments[i].totalInterest.toFixed(2));
        paycols[5].textContent = currencyFormatter.format(payments[i].balance.toFixed(2));
        
        //append to the table
        
        tableBody.appendChild(payRow);
    }

    //total interest is in the last row of the payments array.

    let totalInterest = payments[payments.length - 1].totalInterest;

    //calculate total cost

    let totalCost = Number(loanAmount) + totalInterest;

    //Build out the summary area

    let labelPrincipal = document.getElementById("totalPrincipal");
    labelPrincipal.innerHTML = Number(loanAmount).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let labelInterest = document.getElementById("totalInterest");
    labelInterest.innerHTML = Number(totalInterest).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let paymentdiv = document.getElementById("payment");
    paymentdiv.innerHTML = Number(payment).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    let totalCostDiv = document.getElementById("totalCost");
    totalCostDiv.innerHTML = Number(totalCost).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}