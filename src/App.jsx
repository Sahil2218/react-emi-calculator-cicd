import { useState } from 'react'
import './App.css'

function App() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [tenure, setTenure] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const calculateEMI = () => {
    setError('')
    setResult(null)

    const P = parseFloat(loanAmount)
    const annualRate = parseFloat(interestRate)
    const N = parseInt(tenure) * 12

    if (!P || P <= 0 || !annualRate || annualRate <= 0 || !N || N <= 0) {
      setError('Please enter valid positive numbers for all fields.')
      return
    }

    const R = annualRate / 12 / 100
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1)
    const totalPayment = emi * N
    const totalInterest = totalPayment - P

    setResult({
      monthlyEMI: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    })
  }

  return (
    <div className="app">
      <h1>EMI Calculator</h1>

      <div className="form">
        <div className="input-group">
          <label htmlFor="loanAmount">Loan Amount (₹)</label>
          <input
            id="loanAmount"
            type="number"
            placeholder="e.g. 500000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="interestRate">Interest Rate (% per annum)</label>
          <input
            id="interestRate"
            type="number"
            step="0.1"
            placeholder="e.g. 8.5"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="tenure">Loan Tenure (Years)</label>
          <input
            id="tenure"
            type="number"
            placeholder="e.g. 20"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>

        <button onClick={calculateEMI}>Calculate EMI</button>

        {error && <p className="error">{error}</p>}
      </div>

      {result && (
        <div className="results">
          <div className="card">
            <h3>Monthly EMI</h3>
            <p>₹ {Number(result.monthlyEMI).toLocaleString('en-IN')}</p>
          </div>
          <div className="card">
            <h3>Total Interest</h3>
            <p>₹ {Number(result.totalInterest).toLocaleString('en-IN')}</p>
          </div>
          <div className="card">
            <h3>Total Payment</h3>
            <p>₹ {Number(result.totalPayment).toLocaleString('en-IN')}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
