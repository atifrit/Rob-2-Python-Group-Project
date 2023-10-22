
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .portfolios import Portfolio
from .companies import Company



class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), primary_key=True, nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')), primary_key=True, nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    sold = db.Column(db.Boolean, nullable=False)
