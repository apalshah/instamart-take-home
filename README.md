
# Clone the repository
```bash
git clone git@github.com:apalshah/instamart-take-home.git
```

# Go to project directory
```bash
cd instamart-take-home
```

# Setup Django backend
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```

# Setup and run react frontend (open a different terminal)
```bash
cd emp-app-react
npm install
npm run dev
```

# How to open the react app
 - URL: http://localhost:5173/
 - Initially employees list would be empty, you can create, edit, update and delete employees as per requirements

 # How to clean up your Django environment
 ```bash
 rm -rf venv empapi/migrations db.sqlite3
 ```