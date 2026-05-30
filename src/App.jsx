import { useState } from 'react'
import './App.css'

const menuItems = [
  ['Coffee', 'For our long talks and tiny smiles'],
  ['Brownie', 'Because you are already the sweetest part'],
  ['Fries', 'For sharing... but I may steal some'],
  ['Laughs', 'Unlimited and absolutely mandatory'],
]

const reasons = [
  'I promise I will behave... mostly.',
  'You get coffee, snacks, and my full attention.',
  'It will be our cute little memory.',
  'I will make you laugh even if my jokes are bad.',
]

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noCount, setNoCount] = useState(0)

  const noMessages = [
    'No',
    'Are you sure?',
    'Think again ☕',
    'Coffee is waiting',
    'Wrong button 😭',
    'Okay fine... YES ❤️',
  ]

  const handleNo = () => {
    if (noCount >= noMessages.length - 2) {
      setAccepted(true)
      return
    }
    setNoCount((count) => count + 1)
  }

  return (
    <main className="page-shell">
      <div className="floating-heart heart-one">❤</div>
      <div className="floating-heart heart-two">♡</div>
      <div className="floating-heart heart-three">☕</div>

      <section className="hero card-glow">
        <p className="eyebrow">Cafe Date Court</p>
        <h1>Shreya S Chavan, I have one very serious question...</h1>
        <p className="hero-text">
          A boy named <strong>Sahil D Chavan</strong> is officially accused of wanting
          one cute cafe date with his favorite person.
        </p>
        <a className="scroll-btn" href="#question">Open the case file</a>
      </section>

      <section className="story-section">
        <div className="story-card">
          <span className="story-icon">☕</span>
          <h2>The tiny plan</h2>
          <p>
            Nothing too fancy. Just coffee, snacks, soft teasing, random talks,
            and a little moment that feels like us.
          </p>
        </div>
        <div className="story-card">
          <span className="story-icon">💌</span>
          <h2>The request</h2>
          <p>
            This is not just a cafe date request. This is a small excuse to spend
            more time with you.
          </p>
        </div>
      </section>

      <section className="menu-card card-glow">
        <p className="eyebrow">Today's Special</p>
        <h2>Our Cute Cafe Menu</h2>
        <div className="menu-grid">
          {menuItems.map(([item, meaning]) => (
            <div className="menu-item" key={item}>
              <h3>{item}</h3>
              <p>{meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reasons-section">
        <p className="eyebrow">Evidence</p>
        <h2>Why you should say yes</h2>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div className="reason-card" key={reason}>
              <span>{index + 1}</span>
              <p>{reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="question" className="question-card card-glow">
        {accepted ? (
          <div className="success-box">
            <div className="confetti">🎉 💖 ☕ 💖 🎉</div>
            <h2>Yayyy! Date confirmed.</h2>
            <p>
              Sahil is now officially the happiest cafe boy. Get ready for coffee,
              smiles, and one cute memory together.
            </p>
            <button className="yes-btn" onClick={() => setAccepted(false)}>
              Replay the proposal
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Final Verdict</p>
            <h2>Will you go on a cafe date with Sahil?</h2>
            <p className="question-text">
              Please choose carefully. The cafe, coffee, and guilty boy are waiting.
            </p>
            <div className="button-row">
              <button className="yes-btn" onClick={() => setAccepted(true)}>
                YES ☕❤️
              </button>
              <button
                className={`no-btn dodge-${Math.min(noCount, 4)}`}
                onClick={handleNo}
              >
                {noMessages[noCount]}
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default App
