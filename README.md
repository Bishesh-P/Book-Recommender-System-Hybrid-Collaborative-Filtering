# 📚 Book Recommender System

A full-stack book recommender with a React frontend and a FastAPI backend. It combines a **popularity-based ranking** with an **item-based collaborative filtering** engine that suggests books similar to one you already like.

## Features

- **Popular tab:** the top 50 highest-rated books among those with at least 250 ratings
- **Recommend tab:** search a title with autocomplete and get 5 similar books
- **About tab:** project details and usage guide inside the app
- Error handling for titles that are not in the model
- Interactive API docs at `/docs` (FastAPI)

## How it works

**1. Popularity-based recommender**
- Ratings are merged with book metadata on ISBN.
- The number of ratings and the average rating are computed per book.
- Books with at least 250 ratings are sorted by average rating, and the top 50 are kept.

**2. Collaborative filtering (item-based)**
- Only active users (more than 200 ratings) and books with at least 50 ratings are kept, to reduce noise.
- A pivot table is built with books as rows, users as columns and ratings as values (missing values filled with 0).
- Cosine similarity is computed between all books.
- For a selected book, the 5 most similar books are returned.

## Tech stack

| Layer    | Tools                                  |
|----------|----------------------------------------|
| Model    | Python, pandas, NumPy, scikit-learn    |
| Backend  | FastAPI, Uvicorn                       |
| Frontend | React (Vite)                           |

## Project structure

```
Book-Recommender/
├── app.py                          # FastAPI backend
├── Book_Recommender_System.ipynb   # Data analysis and model building
├── models/                         # Pickled artifacts used by the API
│   ├── popular.pkl
│   ├── pt.pkl
│   ├── books.pkl
│   └── similarity_score.pkl
├── data/                           # Books.csv, Users.csv, Ratings.csv
└── frontend/                       # React app (Vite)
    └── src/
        ├── App.jsx
        ├── BookCard.jsx
        ├── About.jsx
        └── App.css
```

## Getting started

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Clone the repo

```bash
git clone https://github.com/Bishesh-P/Book-Recommender-System-Hybrid-Collaborative-Filtering.git
cd Book-Recommender-System-Hybrid-Collaborative-Filtering
```

### 2. Backend

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install fastapi uvicorn pandas numpy scikit-learn
uvicorn app:app --reload --port 5000
```

The API runs at `http://127.0.0.1:5000` and the docs at `http://127.0.0.1:5000/docs`.

### 3. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints, usually `http://localhost:5173`. The Vite dev server proxies `/api` requests to the backend on port 5000.

## Regenerating the model files

The `.pkl` files in `models/` are created by the notebook. To rebuild them:

1. Place `Books.csv`, `Users.csv` and `Ratings.csv` in `data/`.
2. Run `Book_Recommender_System.ipynb` from top to bottom.
3. Run the export cell to save `popular.pkl`, `pt.pkl`, `books.pkl` and `similarity_score.pkl`, then copy them into `models/`.

## API endpoints

| Method | Endpoint                      | Description                          |
|--------|-------------------------------|--------------------------------------|
| GET    | `/api/popular`                | Top 50 popular books                 |
| GET    | `/api/titles`                 | All titles available for search      |
| GET    | `/api/recommend?title=<name>` | 5 similar books for the given title  |

## Limitations

- Only books that passed the rating filters can be searched.
- Recommendations use rating patterns only, not genre or book content.
- Cold-start: new books and new users are not handled.

## Future improvements

- Add content-based features (genre, author, description) for a true hybrid model
- Click a book card to get recommendations directly
- Deploy the backend and frontend

## Author

**Bishesh Pokharel**
GitHub: [@Bishesh-P](https://github.com/Bishesh-P)