from flask import Blueprint, jsonify, session, request
from app.models import Portfolio, User, Transaction, Company, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import BuyForm, SellForm
from decimal import Decimal

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

transactions_routes = Blueprint('transactions', __name__)

@transactions_routes.route('/')
@login_required
def UserTransactions():
    print('made it to get route')
    transactions = Transaction.query.filter_by(portfolio_id=current_user.portfolios[0].id).all()
    print('transactions: ', transactions[0].company_id)

    transactionObj = {}
    for i in transactions:
        company = Company.query.filter_by(id=i.company_id).first()
        ticker = company.ticker
        if ticker in transactionObj.keys():
            transactionObj[ticker].append(i.shares)
        else:
            transactionObj[ticker] = [i.shares]
    return jsonify(transactionObj)

@transactions_routes.route('/', methods=['POST'])
@login_required
def Buy():
    # data = request.json

    print('currentuser portfolio: ', current_user.portfolios[0].id)
    form = BuyForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    # form['buyCount'].data = data['buyCount']
    # form['user'].data = User.query.filter(User.id == data['userId']).first()
    # form['current_price'] = data.prices[len(data.prices) - 1]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        new_transaction = Transaction(portfolio_id=current_user.portfolios[0].id, company_id=form.data['companyId'], shares=int(form.data['buyCount']), sold=False)
        db.session.add(new_transaction)
        new_balance = round(Decimal(current_user.portfolios[0].balance) - Decimal(form.data['balanceDeduct']), 2)
        portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
        portfolio.balance = new_balance
        db.session.commit()
        updated = Portfolio.query.filter_by(user_id=current_user.id).first()
        print('new balance: ', updated.balance)
        print('made it to validate')
        return jsonify({"message": "transaction successful"}), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




@transactions_routes.route('/sell', methods=['POST'])
@login_required
def Sell():
    # data = request.json

    print('currentuser portfolio: ', current_user.portfolios[0].id)
    form = SellForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    # form['buyCount'].data = data['buyCount']
    # form['user'].data = User.query.filter(User.id == data['userId']).first()
    # form['current_price'] = data.prices[len(data.prices) - 1]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        new_transaction = Transaction(portfolio_id=current_user.portfolios[0].id, company_id=form.data['companyId'], shares=int(form.data['negSellCount']), sold=False)
        db.session.add(new_transaction)
        new_balance = round(Decimal(current_user.portfolios[0].balance) - Decimal(form.data['balanceDeduct']), 2)
        portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
        portfolio.balance = new_balance
        db.session.commit()
        updated = Portfolio.query.filter_by(user_id=current_user.id).first()
        print('new balance: ', updated.balance)
        print('made it to validate')
        return jsonify({"message": "transaction successful"}), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
