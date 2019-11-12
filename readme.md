##Root folder contains folder with django project (backend) and folder with react project (frontend)

1. To start django server enter backend folder

- Create python virtual enviroment in root of the project with command 'virtualenv -p python3 env'. If not working, make sure you have installed 'virtualenv'.
- Activate the enviroment with 'source env/bin/activate'.
- Install required packages with 'pip3 install -r requirements.txt'.
- Create database and run all migrations with 'python manage.py migrate'.
- To start server type 'python3 manage.py runserver'.

2. To start react server enter frontend folder

- Make sure you have node and npm installed
- Type 'npm install' to install all dependencies
- Type 'npm start' to start dev server
