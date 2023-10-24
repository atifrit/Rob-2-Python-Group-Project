from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, User, Transaction, Company, db
from flask_login import current_user, login_user, logout_user, login_required


portfolio_routes = Blueprint('portfolio', __name__)


@portfolio_routes.route('/current', methods=['GET'])
@login_required
def get_current_user_portfolio():

    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()

    if portfolio:

        transactions = Transaction.query.filter_by(portfolio_id=portfolio.id).all()


        transaction_details = []

        for transaction in transactions:

            company = Company.query.get(transaction.company_id)


            transaction_details.append({
                'company_name': company.name,
                'shares_owned': transaction.shares,
                'sold': transaction.sold,
                'ticker': company.ticker
            })


        return jsonify({
            'portfolio_id': portfolio.id,
            'user_id': portfolio.user_id,
            'balance': portfolio.balance,
            'transactions': transaction_details
        })
    else:
        return jsonify({'error': 'Portfolio not found'}), 404
