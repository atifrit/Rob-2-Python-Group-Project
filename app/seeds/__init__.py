from flask.cli import AppGroup
from .users import seed_users, undo_users
from .companies import seed_companies, undo_companies
from .portfolios import seed_portfolios, undo_portfolios
from .transactions import seed_transactions, undo_transactions
from .watchlists import seed_watchlists, undo_watchlists
from .watchlists_stocks import seed_watchlist_stocks, undo_watchlist_stocks

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_companies()
        undo_portfolios()
        undo_transactions()
        undo_watchlists()
        undo_watchlist_stocks()



    seed_users()
    seed_companies()
    seed_portfolios()
    seed_transactions()
    seed_watchlists()
    seed_watchlist_stocks()



    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_companies()
    undo_portfolios()
    undo_transactions()
    undo_watchlists()
    undo_watchlist_stocks()
    # Add other undo functions here
