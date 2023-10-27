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
                'company_id': company.id,
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


@portfolio_routes.route('/add_balance', methods=['POST'])
@login_required
def add_balance_to_portfolio():

    data = request.get_json()


    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount not provided'}), 400

    amount = float(data['amount'])

    if amount < 0:
        return jsonify({'error': 'Invalid amount'}), 400


    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()

    if not portfolio:
        return jsonify({'error': 'Portfolio not found'}), 404


    portfolio.balance += amount


    db.session.commit()

    return jsonify({'message': 'Balance updated successfully', 'new_balance': portfolio.balance})


@portfolio_routes.route('/remove_balance', methods=['POST'])
@login_required
def remove_balance_from_portfolio():
    data = request.get_json()

    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount not provided'}), 400

    amount = float(data['amount'])

    if amount < 0:
        return jsonify({'error': 'Invalid amount'}), 400

    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()

    if not portfolio:
        return jsonify({'error': 'Portfolio not found'}), 404

    if amount > portfolio.balance:
        return jsonify({'error': 'Insufficient funds'}), 400

    portfolio.balance -= amount

    db.session.commit()

    return jsonify({'message': 'Balance updated successfully', 'new_balance': portfolio.balance})
