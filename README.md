# NYCNeighbors by Amazing Edamame

## Members: Daniel Liu, Anjini Katari, Emerson Gelobter, May Qiu

# Summary
Site to look at the various neighborhoods of NYC on an interactive city map. By clicking over the neighborhood, users will see a popup of the neighborhood name and borough. If the user wants to learn more about the neighborhood, they can click on the More Info Link link in the popup, which will bring them to a separate page where they can see graphs and historical trends regarding specific categories of data, ranging from demographics/incomes of the neighborhood residents to average sale prices of the houses in that neighborhood.

# Databases

https://data.cityofnewyork.us/City-Government/NYC-Address-Points/g6pj-hd8k

https://data.cityofnewyork.us/City-Government/DOF-Summary-of-Neighborhood-Sales-by-Neighborhood-/5ebm-myj7

https://data.cityofnewyork.us/Business/Neighborhood-Financial-Health-Digital-Mapping-and-/r3dx-pew9

# API's

https://github.com/stuy-softdev/notes-and-code/blob/main/api_kb/411_on_PositionStack.md

# Launch Codes

0. Clone repository

 ```bash
 git clone git@github.com:Emerson-Gelobter/P04_AmazingEdamame.git
 ```

1. `cd` into the local repository

 ```bash
 cd P04_AmazingEdamame/
 ```

2. Install necessary packages

 ```bash
 pip install -r requirements.txt
 ```

3. `cd` into the app directory

 ```bash
 cd app/
 ```

4. Set up the database

 ```bash
 python setup_database.py
 ```

5. Start Flask server

 ```bash
 python __init__.py
 ```

6. Visit ` http://127.0.0.1:5000` in browser

7. Vist `https://marshyy.me:5002/` to see the web app on a Digital Ocean Droplet
