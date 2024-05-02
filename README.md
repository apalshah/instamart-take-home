# How to clone the repository
git clone git@github.com:apalshah/instamart-take-home.git

#Go to project directory 
cd instamart-take-home

#setup Django backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


#setup and run react frontend
cd emp-app-react
npm install
npm run dev
