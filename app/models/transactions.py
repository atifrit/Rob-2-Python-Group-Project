from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .portfolios import Portfolio
from .companies import Company

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')), nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    sold = db.Column(db.Boolean, nullable=False)

    company = db.relationship('Company', back_populates='transactions')
    portfolio = db.relationship('Portfolio', back_populates='transactions')
