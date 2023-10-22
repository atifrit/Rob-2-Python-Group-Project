from .db import db, environment, SCHEMA

class Company(db.Model):
    __tablename__ = 'companies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ticker = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    ceo = db.Column(db.String(255))
    employees = db.Column(db.Integer)
    headquarters = db.Column(db.String(255))
    founded = db.Column(db.Integer)
    marketcap = db.Column(db.Float)
    pe_ratio = db.Column(db.Float)
    div_yield = db.Column(db.Float)
    avg_volume = db.Column(db.Float)
    high = db.Column(db.Float)
    low = db.Column(db.Float)
    open_price = db.Column(db.Float)
    volume = db.Column(db.Float)
    week_high = db.Column(db.Float)
    week_low = db.Column(db.Float)
