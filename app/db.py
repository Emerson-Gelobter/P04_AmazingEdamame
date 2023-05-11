import sqlite3
import csv

DB_FILE = "zetten.db"

def query(sql, extra = None):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    if extra is None:
        res = c.execute(sql)
    else:
        res = c.execute(sql, extra)
    db.commit()
    db.close()
    return res

def create_table(name, header):
    query(f"CREATE TABLE IF NOT EXISTS {name} {header}")

def add_account(username, password):
    if not(check_username(username)):
        query("INSERT INTO userInfo VALUES (?, ?)", (username, password))
    else:
        return -1

def check_username(username):
    accounts = get_table_contents("userInfo")
    for account in accounts:
        if account[0] == username:
            return True
    return False
def check_username_survey(username):
    accounts = get_table_contents("surveyPreference")
    for account in accounts:
        if account[0] == username:
            return True
    return False
#return true if username and password are in db, false if one isn't
def verify_account(username, password):
    accounts = get_table_contents("userInfo")
    for account in accounts:
        if account[0] == username and account[1] == password:
            return True
    return False

def get_table_contents(tableName):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    res = c.execute(f"SELECT * from {tableName}")
    out = res.fetchall()
    db.commit()
    db.close()
    print(out)
    return out

def setup():

    users_header = ("(username TEXT, password TEXT)")
    create_table("userInfo",users_header)
    
    survey_header = ("(username Text, neighborhood Text, price Text, priority Text, secpriority Text)")
    create_table("surveyPreference", survey_header)

    neighbors_header = ("(Name TEXT,Borough TEXT,Coordinates TEXT)")
    create_table("neighborhoods",neighbors_header)
    with open ("static/datasets/Neighborhoods.csv","r") as neighbors_csv:
        db = sqlite3.connect(DB_FILE, check_same_thread=False)
        c = db.cursor()
        csv_reader = csv.reader(neighbors_csv)
        for row in csv_reader:
            c.execute('''
                INSERT INTO neighborhoods (Name,Borough,Coordinates)
                VALUES (?, ?, ?)
            ''', (row[2],row[8],row[0]))
    c.close()
    db.commit()
    
    sales_header = ('''(Borough TEXT, Neighborhood TEXT, Type TEXT, Sales_Amount INTEGER, 
    Lowest INTEGER, Average INTEGER, Median INTEGER, Highest INTEGER, Year INTEGER)''')
    create_table("sales_info",sales_header)
    with open ("static/datasets/Sales.csv","r") as sales_csv:
        db_1 = sqlite3.connect(DB_FILE, check_same_thread=False)
        c_1 = db_1.cursor()
        csv_reader = csv.reader(sales_csv)
        for row in csv_reader:
            c_1.execute('''
                INSERT INTO sales_info (Borough, Neighborhood, Type, Sales_Amount, Lowest, Average, Median, Highest, Year)
                VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)
            ''', (row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8]))
    c_1.close()
    db_1.commit()

    financials_header = ('''(Year_Published TEXT, PUMA INTEGER, Borough TEXT, Neighborhood TEXT, 
    Community_District_No TEXT, Poverty_Index FLOAT, Median_Income INTEGER, Percent_White FLOAT, 
    Percent_Black FLOAT, Percent_Asian FLOAT, Percent_Other FLOAT, Percent_Hispanic FLOAT )''')
    create_table("financials_info",financials_header)
    with open("static/datasets/Financials.csv","r") as financials_csv:
        db_2 = sqlite3.connect(DB_FILE, check_same_thread=False)
        c_2 = db_2.cursor()
        csv_reader = csv.reader(financials_csv)
        for row in csv_reader:
            c_2.execute('''
                INSERT INTO financials_info (Year_Published, PUMA, Borough, Neighborhood, Community_District_No, Poverty_Index, Median_Income, Percent_White, Percent_Black, Percent_Asian, Percent_Other, Percent_Hispanic)
                VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)
            ''', (row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11]))
    c_2.close()
    db_2.commit()

def get_table_specifics(tableName, search,search1):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    res = c.execute(f"SELECT {search} AND {search1} from {tableName}")
    out = res.fetchall()
    db.commit()
    db.close()
    return out

def add_survey(username, neighborhood, price, priority, secpriority ):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    if (check_username_survey(username)):
        c.execute("UPDATE surveyPreference SET (?, ?, ?, ?) WHERE username = ?(neighborhood, price, priority, secpriority, username)")
    else:
        c.execute('''INSERT INTO surveyPreference (username, neighborhood, price, priority, secpriority)(?,?,?,?,?)''')
    get_table_contents(surveyPreference)
    db.commit()
    db.close()

    
    
