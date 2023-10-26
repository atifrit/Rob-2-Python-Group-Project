from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, User, Transaction, Company, db
from flask_login import current_user, login_user, logout_user, login_required

transactions_routes = Blueprint('transactions', __name__)

@transactions_routes.route('/', methods=['POST'])
@login_required
def BuySell():
    data = request.json

    print('backend data: ', data['userId'])
    return None


    new_transaction = Transaction(portfolio_id=data['userId'], company_id=data['companyId'], shares=data['buyCount'], sold=False)

    print('new transaction: ', new_transaction)
    if new_transaction:
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify({"message": "transaction successful", "transaction_id": new_transaction.id}), 201
