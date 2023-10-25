from app.models import db, Watchlist, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():

    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    bobbie_user = User.query.filter_by(username='bobbie').first()


    watchlist1 = Watchlist(user_id=demo_user.id, name='Game companies')
    watchlist2 = Watchlist(user_id=marnie_user.id, name='buy the dip')
    watchlist3 = Watchlist(user_id=bobbie_user.id, name='hodl')
    watchlist4 = Watchlist(user_id=demo_user.id, name='Car companies')

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)
    db.session.add(watchlist4)
    db.session.commit()

def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
