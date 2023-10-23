from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User
# from .transactions import Transaction

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    balance = db.Column(db.Float, nullable=False)

    transactions = db.relationship('Transaction', back_populates='portfolio')
    user = db.relationship('User', back_populates='portfolios')
