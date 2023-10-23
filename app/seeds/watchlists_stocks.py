from app.models import db, WatchlistStock, Watchlist, Company, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlist_stocks():


    demo_watchlist = Watchlist.query.filter_by(user_id=User.query.filter_by(username='Demo').first().id).first()
    marnie_watchlist = Watchlist.query.filter_by(user_id=User.query.filter_by(username='marnie').first().id).first()
    bobbie_watchlist = Watchlist.query.filter_by(user_id=User.query.filter_by(username='bobbie').first().id).first()


    company1 = Company.query.first()
    company2 = Company.query.offset(1).first()


    watchlist_stock1 = WatchlistStock(watchlist_id=demo_watchlist.id, company_id=company1.id)
    watchlist_stock2 = WatchlistStock(watchlist_id=marnie_watchlist.id, company_id=company2.id)
    watchlist_stock3 = WatchlistStock(watchlist_id=bobbie_watchlist.id, company_id=company1.id)

    db.session.add(watchlist_stock1)
    db.session.add(watchlist_stock2)
    db.session.add(watchlist_stock3)
    db.session.commit()

def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
