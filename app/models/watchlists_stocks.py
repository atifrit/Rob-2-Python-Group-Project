from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .watchlists import Watchlist
# from .companies import Company

class WatchlistStock(db.Model):
    __tablename__ = 'watchlist_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watchlists.id')), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')), nullable=False)

    watchlist = db.relationship('Watchlist', back_populates='watchlist_stocks')
    company = db.relationship('Company', back_populates='watchlist_stocks')
