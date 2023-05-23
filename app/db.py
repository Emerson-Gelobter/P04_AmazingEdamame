import sqlite3
import csv
import geo

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

def get_table_contents(tableName):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    res = c.execute(f"SELECT * from {tableName}")
    out = res.fetchall()
    db.commit()
    db.close()
    return out

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
    print("checked")
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

def setup():

    users_header = ("(username TEXT, password TEXT)")
    create_table("userInfo",users_header)
    
    survey_header = ("(username TEXT, neighborhood TEXT, price TEXT, priority TEXT, secpriority TEXT)")
    create_table("surveyPreference", survey_header)

    neighbors_header = ("(Latitude FLOAT,Longitude FLOAT,Name TEXT,Borough TEXT)")
    create_table("neighborhoods",neighbors_header)
    with open ("static/datasets/neighborhoods.csv","r") as neighbors_csv:
        db = sqlite3.connect(DB_FILE, check_same_thread=False)
        c = db.cursor()
        csv_reader = csv.reader(neighbors_csv)
        for row in csv_reader:
            c.execute('''
                INSERT INTO neighborhoods (Latitude,Longitude,Name,Borough)
                VALUES (?, ?, ?,?)
            ''', (row[1],row[0],row[3],row[9]))
    c.close()
    db.commit()
    
    sales_header = ('''(Borough TEXT, Neighborhood TEXT, Type TEXT, Sales_Amount INTEGER, 
    Lowest INTEGER, Average INTEGER, Median INTEGER, Highest INTEGER, Year INTEGER)''')
    create_table("sales_info",sales_header)
    with open ("static/datasets/sales.csv","r") as sales_csv:
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
    Percent_Black FLOAT, Percent_Asian FLOAT, Percent_Other FLOAT, Percent_Hispanic FLOAT, Latitude FLOAT, Longitude FLOAT)''')
    create_table("financials_info",financials_header)
    with open("static/datasets/new_financials.csv","r") as financials_csv:
        db_2 = sqlite3.connect(DB_FILE, check_same_thread=False)
        c_2 = db_2.cursor()
        csv_reader = csv.reader(financials_csv)
        for row in csv_reader:
            c_2.execute('''
                INSERT INTO financials_info (Year_Published, Borough, Neighborhood, Community_District_No, Poverty_Index, Median_Income, 
                Percent_White, Percent_Black, Percent_Asian, Percent_Other, Percent_Hispanic,Latitude,Longitude)
                VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?)
            ''', (row[0],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],row[12],row[13]))
    c_2.close()
    db_2.commit()


def get_latitude_longitudes():
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    res = c.execute(f"SELECT Latitude, Longitude from neighborhoods")
    out = res.fetchall()
    db.close()
    return out

def get_financial_specific(query):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    res = c.execute(f"SELECT * from financials_info WHERE Neighborhood = ?", (query,))
    out = res.fetchall()
    db.close()
    return out

def get_borough_specific(borough, priceRange, propertyType):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    borough = borough.upper()
    propertyType = propertyType
    priceRange_min = priceRange[0]
    priceRange_max = priceRange[1]
    res = c.execute(f"SELECT * from sales_info WHERE Borough = ? AND Year = ? AND Type=? AND Median >= ? AND Median <= ?;", (borough,"2021",propertyType,priceRange_min,priceRange_max))
    out = res.fetchall()
    db.close()
    return out

def add_survey(username, neighborhood, price, priority, secpriority ):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    if (check_username_survey(username)):
        c.execute('''DELETE FROM surveyPreference WHERE username = (?)''',(username))
        c.execute('''INSERT INTO surveyPreference VALUES (?,?,?,?,?)''',(username, neighborhood, price, priority, secpriority))
    else:
        c.execute('''INSERT INTO surveyPreference VALUES (?,?,?,?,?)''',(username, neighborhood, price, priority, secpriority))
    get_table_contents("surveyPreference")
    db.commit()
    db.close()
"""
def process():
    with open("static/datasets/financials.csv", "r") as financials_csv:
        db_2 = sqlite3.connect(DB_FILE, check_same_thread=False)
        c_2 = db_2.cursor()
        csv_reader = csv.reader(financials_csv)
        updated_rows = []  # To store updated rows

        for i,row in enumerate(csv_reader):
            if i % 6 == 0:
                try:    
                    lat, long = geo.get_lat_long(row[3],row[2])  # Call your function to get latitude and longitude values separately

                    row.append(lat)
                    row.append(long)
                except Exception as e:
                    print(f"Error processing row: {row}. Error: {e}")
                    updated_rows.append(row)
                    continue

                updated_rows.append(row)  # Store the updated row

    # After the loop, you can proceed with further processing or writing the updated rows back to the CSV file
    # For example:
    with open("updated_financials.csv", "w", newline="") as updated_csv:
        csv_writer = csv.writer(updated_csv)
        csv_writer.writerows(updated_rows)
process()
"""