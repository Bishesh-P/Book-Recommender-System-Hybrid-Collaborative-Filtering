import { useEffect, useState } from 'react'
import BookCard from './BookCard'
import About from './About'
import './App.css'

export default function App() {
  const [tab, setTab] = useState('popular')
  const [popular, setPopular] = useState([])
  const [titles, setTitles] = useState([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/popular').then(r => r.json()).then(setPopular)
    fetch('/api/titles').then(r => r.json()).then(setTitles)
  }, [])

  const handleRecommend = async (e) => {
    e.preventDefault()
    setError('')
    setResults([])
    setLoading(true)
    try {
      const res = await fetch(`/api/recommend?title=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (!res.ok) setError(data.detail)
      else setResults(data)
    } catch {
      setError('Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <nav>
        <h2>📚 Book Recommender</h2>
        <button className={tab === 'popular' ? 'active' : ''} onClick={() => setTab('popular')}>Popular</button>
        <button className={tab === 'recommend' ? 'active' : ''} onClick={() => setTab('recommend')}>Recommend</button>
        <button className={tab === 'about' ? 'active' : ''} onClick={() => setTab('about')}>About</button>
      </nav>

      {tab === 'popular' && (
        <>
          <h3>Top 50 Popular Books</h3>
          <div className="grid">
            {popular.map(b => <BookCard key={b.title} book={b} />)}
          </div>
        </>
      )}

      {tab === 'recommend' && (
        <>
          <form onSubmit={handleRecommend}>
            <input
              list="titles"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Start typing a book title..."
              required
            />
            <datalist id="titles">
              {titles.map(t => <option key={t} value={t} />)}
            </datalist>
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Recommend'}
            </button>
          </form>
          {error && <div className="error">{error}</div>}
          <div className="grid">
            {results.map(b => <BookCard key={b.title} book={b} />)}
          </div>
        </>
      )}

      {tab === 'about' && <About />}
    </div>
  )
}