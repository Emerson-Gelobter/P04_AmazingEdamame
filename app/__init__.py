from flask import Flask             #facilitate flask webserving
from flask import render_template, request   #facilitate jinja templating
from flask import session, redirect, url_for, make_response        #facilitate form submission
import os
import db

app = Flask(__name__)    #create Flask object
app.secret_key = os.urandom(32)


@app.route('/')
def index():
    if 'username' in session:
        return redirect("/home")
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
        return redirect("/home")
    if request.form.get('submit_button') is not None:
        return render_template("registration.html")
    else:
        resp = make_response(render_template('error.html',msg = "Username or Password is not correct"))
        return resp

@app.route('/info')
def info():
    return (db.get_table_contents("financials_info"), render_template('moreinfo.html'))

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
        return redirect("/login")
    username = session['username']
    password = session['password']
    if db.verify_account(username, password):
        return render_template('home_page.html',username = session['username'])


def verify_session():
    if 'username' in session and 'password' in session:
        if db.verify_account(session['username'], session['password']):
            return True
    return False

@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route("/survey", methods = ['GET','POST'])
def survey(): 
    user = "nothing"
    neighborhood_preference = request.form.get('neighborhood')
    price_range = request.form.get('priceRange') 
    priority = request.form.get('priority') 
    sec_priority = request.form.get('secondpriority') 
    # if 'username' in session:
    #     user = session['username']
    # db.add_survey(user, neighborhood_preference, price_range, priority, sec_priority)
    return render_template("survey.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/neighborsMap")
def neighborsMap():
    return db.get_table_contents("neighborhoods")


if __name__ == "__main__": #false if this file imported as module
    #enable debugging, auto-restarting of server when this file is modified
    app.debug = True
    app.run()
