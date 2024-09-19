function performCalculation(x, y, operator) {
    switch (operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return y !== 0 ? x / y : 'Error: Division by zero';
        case '%':
            return y !== 0 ? x % y : 'Error: Division by zero';
        default:
            return 'Error: Invalid operator';
    }
}

function calculator() {
    const results = [];
    let continueCalculating = true;

    while (continueCalculating) {
        // Prompt user for input
        let x = parseFloat(prompt("Enter the first number (x):"));
        let y = parseFloat(prompt("Enter the second number (y):"));
        let operator = prompt("Enter the operator (+, -, *, /, %):");

        // Validate inputs
        if (isNaN(x) || isNaN(y)) {
            alert('Error: Invalid number(s)');
            continue;
        }

        // Perform calculation and show result
        let result = performCalculation(x, y, operator);
        results.push({ x, y, operator, result });

        // Display results in a table
        displayResultsTable(results);

        // Check if user wants to continue
        continueCalculating = confirm("Do you want to perform another calculation?");
    }

    // Display summary table
    displaySummaryTable(results);
}

function displayResultsTable(results) {
    const resultsTable = document.getElementById('results');
    let tableHTML = '<table border="1"><tr><th>x</th><th>y</th><th>Operator</th><th>Result</th></tr>';

    for (const entry of results) {
        tableHTML += `<tr><td>${entry.x}</td><td>${entry.y}</td><td>${entry.operator}</td><td>${entry.result}</td></tr>`;
    }

    tableHTML += '</table>';
    resultsTable.innerHTML = tableHTML;
}

function displaySummaryTable(results) {
    const summaryTable = document.getElementById('summary');
    let validResults = results.filter(entry => typeof entry.result === 'number');
    if (validResults.length === 0) {
        summaryTable.innerHTML = '<p>No valid results to summarize.</p>';
        return;
    }

    const min = Math.min(...validResults.map(entry => entry.result));
    const max = Math.max(...validResults.map(entry => entry.result));
    const total = validResults.reduce((acc, entry) => acc + entry.result, 0);
    const average = total / validResults.length;

    let summaryHTML = '<h2>Summary</h2><table border="1"><tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>';
    summaryHTML += `<tr><td>${min}</td><td>${max}</td><td>${average}</td><td>${total}</td></tr></table>`;

    summaryTable.innerHTML = summaryHTML;
}

// Run the calculator function when the script is loaded
calculator();
