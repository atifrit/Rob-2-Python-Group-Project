from flask import Blueprint, request, jsonify
from app.models import db, Company

search_routes = Blueprint('search', __name__)

@search_routes.route('/companies', methods=['GET'])
def search_companies():
    search_query = request.args.get('query')

    if search_query:
        results = Company.query.filter(Company.name.ilike(f'%{search_query}%')).all()

        if results:
            company_list = [
                {
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
                } for company in results
            ]


            return jsonify(company_list)
        else:
            return jsonify([])

    return jsonify([])
