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
    return render_template("home_page.html", names = x)

@app.route('/home')
def home():
    x = db.get_neighborhoods()
    return render_template('home_page.html', names = x)
    
@app.route('/searchBar')
def searchBar():
    name = request.args.get("selectedName")
    x = db.search_bar(name)
    return render_template('searchResults.html', names = x)

@app.route("/survey_redirect")
def surveyredirect(): 
    return render_template("survey.html")

@app.route("/financial_info")
def financialInfo(): 
    return render_template("financialInfo.html")


@app.route("/survey", methods = ['GET','POST'])
def survey(): 
    if request.method == 'POST':
        user = "nothing"
        neighborhood_preference = request.form.get('neighborhood')
        price_range = request.form.get('priceRange') 
        priority = request.form.get('priority') 
        sec_priority = request.form.get('secondpriority') 
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
    data = request.args.get('data')
    x = db.get_financial_specific(data)
    return render_template("moreinfo.html",contents=x)


if __name__ == "__main__": #false if this file imported as module
    #enable debugging, auto-restarting of server when this file is modified
    app.debug = True
    app.run()


