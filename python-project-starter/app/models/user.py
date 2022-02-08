from app.models import portfolio_value
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String)
    cash = db.Column(db.Float, default=5000)
    watchlists = db.relationship("Watchlist", back_populates="user")
    portfolio_value = db.relationship("PortfolioValue", back_populates="user")
    portfolio = db.relationship("Portfolio", back_populates="user")
    #check to see if you make a default value

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):

        #sum the value of all of their stocks
        val_list = []
        for x in self.portfolio:
            y = x.to_dict()
            val_list.append(y["value"])
        total_val = sum(val_list)

        #sum their stocks' value + cash
        aggregate_value = total_val + self.cash

        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_pic": self.profile_pic,
            "cash": self.cash,
            "value_of_holdings": total_val,
            "aggregate_value": aggregate_value,
            "watchlists": [watchlist.to_dict() for watchlist in self.watchlists],
            "portfolio_value": [value.to_dict() for value in self.portfolio_value],
            "portfolio": [port.to_dict() for port in self.portfolio]
        }
