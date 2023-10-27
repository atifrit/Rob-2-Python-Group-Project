from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User, Transaction, Company
from flask_login import current_user

def valid_number(form, field):
    # Checking if user exists
    sellcount = field.data
    if sellcount>-1 :
        raise ValidationError('Invalid Number of shares.')


def sellable(form, field):
    print('form["negSellCount"]: ', form.data["negSellCount"])
    sellcount=field.data
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


    shares = 0
    if form.data['ticker'] in transactionObj.keys():
        sharesArr=transactionObj[form.data['ticker']]
        for share in sharesArr:
            shares+=share

    if(shares < form.data['negSellCount']*-1):
        raise ValidationError(f'You only own {shares} shares.')


# def adequate_balance(form, field):
#     # Checking if password matches
#     price = form['current_price'].data
#     balance = form['user'].data.balance
#     if price*buyCount > balance:
#         raise ValidationError('Insufficient Funds')


class SellForm(FlaskForm):
    negSellCount = IntegerField('sellCount', validators=[DataRequired(), valid_number, sellable])
    companyId = IntegerField('companyId', validators=[])
    balanceDeduct = DecimalField('balanceDeduct', validators=[])
    ticker = StringField('ticker', validators=[])
