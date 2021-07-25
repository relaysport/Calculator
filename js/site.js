function calcPayment(loanAmount, rate, term) {
    return (loanAmount * rate) / (1 - Math.pow(1 + rate, -term));
}

function calcInterest(balance, rate) {
    return balance * rate;
}

function calcRate() {
    let rate = parseFloat(document.getElementById("interestRate").value);
    return rate = rate / 1200;
}

function buildSchedule() {
    let loanAmount = Number(document.getElementById("loanBalance").value);
    let term = parseInt(document.getElementById("paymentTimeline").value);
    let rate = calcRate();

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
    let tableBody = document.getElementById("calculatorBody");
    let template = document.getElementById("calculatorTemplate");
    tableBody.innerHTML = "";

    let currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    for (let i = 0; i < payments.length; i++) {
        payRow = template.content.cloneNode(true);
        paycols = payRow.querySelectorAll("td");

        paycols[0].textContent = payments[i].month;

        paycols[1].textContent = currencyFormatter.format(payments[i].payment.toFixed(2));
        paycols[2].textContent = currencyFormatter.format(payments[i].principal.toFixed(2));
        paycols[3].textContent = currencyFormatter.format(payments[i].interest.toFixed(2));
        paycols[4].textContent = currencyFormatter.format(payments[i].totalInterest.toFixed(2));
        paycols[5].textContent = currencyFormatter.format(payments[i].balance.toFixed(2));

        tableBody.appendChild(payRow);
    }

    let totalInterest = payments[payments.length - 1].totalInterest;
    let totalCost = Number(loanAmount) + totalInterest;

    document.getElementById("topPayment").innerText = "$" + payment.toFixed(2);
    document.getElementById("topInterest").innerText = "$" + totalInterest.toFixed(2);
    document.getElementById("topPrincipal").innerText = "$" + loanAmount.toFixed(2);
    document.getElementById("topCost").innerText = "$" + totalCost.toFixed(2);

}