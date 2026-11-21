export default function About() {
  return (
    <div className="about">
      <h3>About this project</h3>
      <p>
        A book recommender built on user ratings. It has two parts: a popularity
        ranking and a collaborative filtering engine that finds books similar to
        one you already like.
      </p>

      <h4>How to use it</h4>
      <ol>
        <li><b>Popular tab:</b> browse the top 50 highest-rated books that have a large number of ratings.</li>
        <li><b>Recommend tab:</b> start typing a book title and pick it from the dropdown.</li>
        <li>Click <b>Recommend</b> to get 5 similar books.</li>
        <li>If you see a "not found" message, the title is not in the model. Choose one from the dropdown list.</li>
      </ol>

      <h4>How it works</h4>
      <p><b>1. Popularity-based recommender</b></p>
      <ul>
        <li>Ratings are merged with book details using the ISBN.</li>
        <li>For each book, the number of ratings and the average rating are calculated.</li>
        <li>Only books with at least 250 ratings are kept, sorted by average rating, and the top 50 are shown.</li>
      </ul>

      <p><b>2. Collaborative filtering recommender (item-based)</b></p>
      <ul>
        <li>Only active users (more than 200 ratings) and well-rated books (at least 50 ratings) are used, to reduce noise.</li>
        <li>A pivot table is built with books as rows, users as columns and ratings as values. Missing values are filled with 0.</li>
        <li>Cosine similarity is computed between every pair of books.</li>
        <li>For the selected book, the 5 most similar books are returned.</li>
      </ul>

      <h4>Dataset</h4>
      <p>
        Three tables: Books (title, author, publisher, year, cover images), Users
        (location, age) and Ratings (user, ISBN, rating).
      </p>

      <h4>Tech stack</h4>
      <ul>
        <li><b>Model:</b> Python, pandas, NumPy, scikit-learn</li>
        <li><b>Backend:</b> FastAPI</li>
        <li><b>Frontend:</b> React (Vite)</li>
      </ul>

      <h4>Limitations</h4>
      <ul>
        <li>Only books that passed the rating filters can be searched.</li>
        <li>Recommendations are based on rating patterns only, not on genre or book content.</li>
      </ul>

      <p className="by">Built by Bishesh Pokharel</p>
    </div>
  )
}