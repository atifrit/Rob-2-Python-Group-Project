from app.models import db, User, WatchlistStock, Watchlist, Company, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlist_stocks():


    demo_watchlist = Watchlist.query.filter_by(user_id=User.query.filter_by(username='Demo').first().id).first()
    marnie_watchlist = Watchlist.query.filter_by(user_id=User.query.filter_by(username='marnie').first().id).first()
    bobbie_watchlist = Watchlist.query.filter_by(user_id=User.query.filter_by(username='bobbie').first().id).first()
    car_companies_watchlist = Watchlist.query.filter_by(user_id=User.query.filter_by(username='Demo').first().id, name='Car companies').first()


    company1 = Company.query.first()
    company2 = Company.query.offset(1).first()
    company45 = Company.query.get(45)
    company34 = Company.query.get(34)
    company40 = Company.query.get(40)
    company41 = Company.query.get(41)



    watchlist_stock1 = WatchlistStock(watchlist_id=demo_watchlist.id, company_id=company1.id)
    watchlist_stock2 = WatchlistStock(watchlist_id=marnie_watchlist.id, company_id=company2.id)
    watchlist_stock3 = WatchlistStock(watchlist_id=bobbie_watchlist.id, company_id=company1.id)
    watchlist_stock4 = WatchlistStock(watchlist_id=demo_watchlist.id, company_id=company45.id)
    watchlist_stock5 = WatchlistStock(watchlist_id=demo_watchlist.id, company_id=company34.id)
    watchlist_stock6 = WatchlistStock(watchlist_id=car_companies_watchlist.id, company_id=company40.id)
    watchlist_stock7 = WatchlistStock(watchlist_id=car_companies_watchlist.id, company_id=company41.id)




    db.session.add(watchlist_stock1)
    db.session.add(watchlist_stock2)
    db.session.add(watchlist_stock3)
    db.session.add(watchlist_stock4)
    db.session.add(watchlist_stock5)
    db.session.add(watchlist_stock6)
    db.session.add(watchlist_stock7)
    db.session.commit()

def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
