import sqlite3

class db:
    def __init__(self, database: str):
        self.con = sqlite3.connect(database)
        self.cur = self.con.cursor()
    def execute(self, query):
        try:
            res = self.cur.execute(query)
            self.con.commit()
            return (res.fetchall(), None)
        except BaseException as error:
            return (None, '{}'.format(error))