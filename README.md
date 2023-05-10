# NYCNeighbors by Amazing Edamame

## Members: Daniel Liu, Anjini Katari, Emerson Gelobter, May Qiu

# Summary
Site to look at the various neighborhoods of NYC on an interactive city map. By simply hovering over the neighborhood, users can see statistics like average household prices. If the user wants to learn more about the neighborhood, they can click on the More Info Link, which will bring them to a separate page where they can see graphs and historical trends regarding each category.

# Databases

https://data.cityofnewyork.us/City-Government/NYC-Address-Points/g6pj-hd8k

https://data.cityofnewyork.us/City-Government/DOF-Summary-of-Neighborhood-Sales-by-Neighborhood-/5ebm-myj7

https://data.cityofnewyork.us/Business/Neighborhood-Financial-Health-Digital-Mapping-and-/r3dx-pew9


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
4. Start Flask server

 ```bash
 python __init__.py
 ```

5. Visit `http://127.0.0.1:5000/` in browser