from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.user import User


def seed_portfolios():

    demo_user = User.query.filter_by(username='Demo').first()
    marnie_user = User.query.filter_by(username='marnie').first()
    bobbie_user = User.query.filter_by(username='bobbie').first()

    portfolio1 = Portfolio(user_id=demo_user.id, balance=1000.0)
    portfolio2 = Portfolio(user_id=marnie_user.id, balance=1500.0)
    portfolio3 = Portfolio(user_id=bobbie_user.id, balance=800.0)

    db.session.add(portfolio1)
    db.session.add(portfolio2)
    db.session.add(portfolio3)
    db.session.commit()


def undo_portfolios():
    db.session.execute(text("DELETE FROM portfolios"))
    db.session.commit()
