from flask import Flask             #facilitate flask webserving
from flask import render_template, request   #facilitate jinja templating
from flask import session, url_for, make_response        #facilitate form submission
import os
import db

app = Flask(__name__)    #create Flask object
app.secret_key = os.urandom(32)


@app.route('/')
def index():
    x = db.get_neighborhoods()
    if 'username' in session:
        return render_template("home_page.html",username = session['username'], names = x)
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    #Check if it already exists in database and render home page if it does
    #otherwise redirect to error page which will have a button linking to the login page
    username = request.form.get('username')
    password = request.form.get('password')
    if db.verify_account(username,password):
        session['username'] = username
        session['password'] = password
        x = db.get_neighborhoods()
        return render_template("home_page.html",username = session['username'], names = x)
    if request.form.get('submit_button') is not None:
        return render_template("registration.html")
    else:
        resp = make_response(render_template('error.html',msg = "Username or Password is not correct"))
        return resp

@app.route('/register', methods = ['GET', 'POST'])
def register():
    if request.method == 'POST':
        userIn = request.form.get('username')
        passIn = request.form.get('password') 
        if db.add_account(userIn, passIn) == -1:
            return render_template("error.html", msg = f"account with username {userIn} already exists")
        else:
            return render_template("login.html")
    return render_template("registration.html")

@app.route('/home')
def home():
    if 'username' not in session:
        return render_template("login.html")
    username = session['username']
    password = session['password']
    if db.verify_account(username, password):
        x = db.get_neighborhoods()
        return render_template('home_page.html',username = session['username'], names = x)
    
@app.route('/searchBar')
def searchBar():
    if 'username' not in session:
        return render_template("login.html")
    username = session['username']
    password = session['password']
    if db.verify_account(username, password):
        name = request.args.get("selectedName")
        x = db.search_bar(name)
        return render_template('searchResults.html', names = x)


def verify_session():
    if 'username' in session and 'password' in session:
        if db.verify_account(session['username'], session['password']):
            return True
    return False

@app.route("/logout")
def logout():
    session.pop('username', None)
    return render_template("login.html")

@app.route("/survey_redirect")
def surveyredirect(): 
    if verify_session():
        return render_template("survey.html")
    return render_template("error.html",msg="Session Expired")

@app.route("/financial_info")
def financialInfo(): 
    if verify_session():
        return render_template("financialInfo.html")
    return render_template("error.html",msg="Session Expired")

@app.route("/survey", methods = ['GET','POST'])
def survey(): 
    if request.method == 'POST':
        user = "nothing"
        neighborhood_preference = request.form.get('neighborhood')
        price_range = request.form.get('priceRange') 
        priority = request.form.get('priority') 
        sec_priority = request.form.get('secondpriority') 
        print(sec_priority)
        if 'username' in session:
            user = session['username']
        db.add_survey(user, neighborhood_preference, price_range, priority, sec_priority)
    x = db.get_neighborhoods()
    return render_template("home_page.html", names = x)

#ENDPOINT
@app.route("/neighborsMap")
def neighborsMap():
    return db.get_table_contents("neighborhoods")

#ENDPOINT
@app.route('/info')
def info():
    return db.get_table_contents("financials_info")

#function to return sales from sales_info table in db
@app.route('/sales', methods=['POST'])
def sales():
    borough = request.form.get("borough")
    priceRange = request.form.get("priceRange")
    propertyType = request.form.get("type")
    if priceRange == "Less than 400k":
        priceRange = (0, 400000)
    elif priceRange == "400k-600k":
        priceRange = (400000, 600000)
    elif priceRange == "600k-800k":
        priceRange = (600000, 800000)
    elif priceRange == "800k-1.1m":
        priceRange = (800000, 1100000)
    elif priceRange == "1.1m-1.5m":
        priceRange = (1100000, 1500000)
    elif priceRange == "1.5m-2m":
        priceRange = (1500000, 2000000)
    elif priceRange == "2m+":
        priceRange = (2000000, 100000000)
    specific = db.get_borough_specific(borough, priceRange,propertyType)
    if len(specific) > 0:
        return render_template("sales.html",contents=specific)
    return render_template("error.html",msg="No Houses Were Found Matching the Criteria")

#the actual route for more info
@app.route('/infoPage')
def infoPage():
    if 'username' not in session:
        return render_template("login.html")
    else:
        data = request.args.get('data')
        x = db.get_financial_specific(data)
        return render_template("moreinfo.html",contents=x)


if __name__ == "__main__": #false if this file imported as module
    #enable debugging, auto-restarting of server when this file is modified
    app.debug = True
    app.run()


