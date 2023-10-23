from app.models.db import db, environment, SCHEMA, add_prefix_for_prod
from app.models import Transaction
from sqlalchemy.sql import text
from app.models.portfolios import Portfolio
from app.models.companies import Company
from app.models.user import User


def seed_transactions():


    demo_portfolio = Portfolio.query.filter_by(user_id=User.query.filter_by(username='Demo').first().id).first()
    marnie_portfolio = Portfolio.query.filter_by(user_id=User.query.filter_by(username='marnie').first().id).first()
    bobbie_portfolio = Portfolio.query.filter_by(user_id=User.query.filter_by(username='bobbie').first().id).first()


    company1 = Company.query.first()
    company2 = Company.query.offset(1).first()


    transaction1 = Transaction(portfolio_id=demo_portfolio.id, company_id=company1.id, shares=10, sold=False)
    transaction2 = Transaction(portfolio_id=marnie_portfolio.id, company_id=company2.id, shares=5, sold=True)
    transaction3 = Transaction(portfolio_id=bobbie_portfolio.id, company_id=company1.id, shares=8, sold=False)

    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.commit()

def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
