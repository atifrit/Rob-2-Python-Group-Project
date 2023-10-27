from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User
# from .watchlists_stocks import WatchlistStock

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255))

    watchlist_stocks = db.relationship('WatchlistStock', back_populates='watchlist')
    user = db.relationship('User', back_populates='watchlists')
