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
             "name": watchlist.name,
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

@watchlists_routes.route('/', methods=['POST'])
@login_required
def create_watchlist():
    data = request.json


    watchlist_name = data.get('name')


    new_watchlist = Watchlist(user_id=current_user.id, name=watchlist_name)

    db.session.add(new_watchlist)
    db.session.commit()


    return jsonify({"message": "Watchlist created successfully", "watchlist_id": new_watchlist.id}), 201


@watchlists_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def delete_watchlist(watchlist_id):
    watchlist = Watchlist.query.get(watchlist_id)

    if not watchlist:
        return jsonify({"error": "Watchlist not found"}), 404


    if watchlist.user_id != current_user.id:
        return jsonify({"error": "Access denied"}), 403


    WatchlistStock.query.filter_by(watchlist_id=watchlist_id).delete()

    db.session.delete(watchlist)
    db.session.commit()

    return jsonify({"message": "Watchlist deleted successfully"}), 200
