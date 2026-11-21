export default function BookCard({ book }) {
  return (
    <div className="card">
      <img src={book.image} alt={book.title} />
      <h4>{book.title}</h4>
      <p className="author">{book.author}</p>
      {book.rating !== undefined && (
        <p className="meta">⭐ {book.rating.toFixed(2)} ({book.votes} votes)</p>
      )}
    </div>
  )
}