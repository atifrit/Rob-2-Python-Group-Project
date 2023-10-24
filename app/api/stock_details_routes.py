from flask import Blueprint, jsonify, session, request
from app.models import Company, User, db
from flask_login import current_user, login_user, logout_user, login_required

companies = Blueprint('companies', __name__)

@companies.route('/')
def get_all_companies():

    companies = Company.query.all()

    companies_list = [{
        "id": company.id,
        "name": company.name,
        "ticker": company.ticker,
        "price": company.price,
        "ceo": company.ceo,
        "employees": company.employees,
        "headquarters": company.headquarters,
        "founded": company.founded,
        "marketcap": company.marketcap,
        "pe_ratio": company.pe_ratio,
        "div_yield": company.div_yield,
        "avg_volume": company.avg_volume,
        "high": company.high,
        "low": company.low,
        "open_price": company.open_price,
        "volume": company.volume,
        "week_high": company.week_high,
        "week_low": company.week_low
    } for company in companies]

    return jsonify(companies_list)

@companies.route('/<int:company_id>')
def get_company_by_id(company_id):
    company = Company.query.get(company_id)

    if not company:
        return jsonify({"error": "Company not found"}), 404

    company_data = {
        "id": company.id,
        "name": company.name,
        "ticker": company.ticker,
        "price": company.price,
        "ceo": company.ceo,
        "employees": company.employees,
        "headquarters": company.headquarters,
        "founded": company.founded,
        "marketcap": company.marketcap,
        "pe_ratio": company.pe_ratio,
        "div_yield": company.div_yield,
        "avg_volume": company.avg_volume,
        "high": company.high,
        "low": company.low,
        "open_price": company.open_price,
        "volume": company.volume,
        "week_high": company.week_high,
        "week_low": company.week_low
    }

    return jsonify(company_data)
