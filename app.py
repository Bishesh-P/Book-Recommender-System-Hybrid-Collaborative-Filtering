from fastapi import FastAPI, HTTPException, Query
import pickle
import numpy as np

popular = pickle.load(open('models/popular.pkl', 'rb'))
pt = pickle.load(open('models/pt.pkl', 'rb'))
books_meta = pickle.load(open('models/books.pkl', 'rb'))
similarity_score = pickle.load(open('models/similarity_score.pkl', 'rb'))

app = FastAPI(title="Book Recommender API")

def recommend(book_name: str):
    index = np.where(pt.index == book_name)[0][0]
    similar = sorted(list(enumerate(similarity_score[index])),
                     key=lambda x: x[1], reverse=True)[1:6]
    result = []
    for i in similar:
        temp = books_meta[books_meta['Book-Title'] == pt.index[i[0]]]
        result.append({
            'title': temp['Book-Title'].values[0],
            'author': temp['Book-Author'].values[0],
            'image': temp['Image-URL-M'].values[0],
        })
    return result

@app.get('/api/popular')
def api_popular():
    return popular.rename(columns={
        'Book-Title': 'title', 'Book-Author': 'author',
        'Image-URL-M': 'image', 'num_ratings': 'votes', 'avg_rating': 'rating'
    }).to_dict('records')

@app.get('/api/titles')
def api_titles():
    return list(pt.index)

@app.get('/api/recommend')
def api_recommend(title: str = Query(..., min_length=1)):
    try:
        return recommend(title.strip())
    except IndexError:
        raise HTTPException(status_code=404, detail=f'"{title}" not found')