from .db import db

class WatchlistTicker(db.Model):
    __tablename__ = "WatchlistTickers"

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    watchlist_id = db.Column(db.Integer, db.ForeignKey("Watchlists.id"), nullable=False)

    watchlist = db.relationship("Watchlists", back_populates="tickers")

    def to_dict(self):
        return {
            "id": self.id,
            "ticker": self.ticker,
            "watchlist_id": self.watchlist_id
        }
