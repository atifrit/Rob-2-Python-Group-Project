from flask import Blueprint, jsonify, session, request
from app.models import Watchlist, WatchlistStock, Company, User, db
from flask_login import current_user, login_user, logout_user, login_required

watchlists_routes = Blueprint('watchlists', __name__)

@watchlists_routes.route('/')
@login_required
def get_watchlists_for_current_user():
    user_watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()

    watchlists_data = []

    for watchlist in user_watchlists:
        watchlist_stocks = WatchlistStock.query.filter_by(watchlist_id=watchlist.id).all()

        watchlist_data = {
            "id": watchlist.id,
            "watchlist_stocks": [
                {
                    "company_id": ws.company_id,
                    "ticker": ws.company.ticker,
                    "price": ws.company.price,

                }
                for ws in watchlist_stocks
            ],
        }

        watchlists_data.append(watchlist_data)

    return jsonify(watchlists_data)
