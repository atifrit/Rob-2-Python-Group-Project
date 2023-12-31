from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def valid_number(form, field):
    # Checking if user exists
    buycount = field.data
    if buycount<1 :
        raise ValidationError('Invalid Number of shares.')


# def adequate_balance(form, field):
#     # Checking if password matches
#     price = form['current_price'].data
#     balance = form['user'].data.balance
#     if price*buyCount > balance:
#         raise ValidationError('Insufficient Funds')


class BuyForm(FlaskForm):
    buyCount = IntegerField('buyCount', validators=[DataRequired(), valid_number])
    companyId = IntegerField('companyId', validators=[])
    balanceDeduct = DecimalField('balanceDeduct', validators=[])
