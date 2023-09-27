#JC Monsieur Edmund Tubiera

This file provides instructions on how to set up and install the this project. This project consists of a frontend built with React and Material UI and a backend built with PHP and Laravel. 

## Requirements

Please ensure that you have the following software installed on your system before proceeding with the installation:

Latest Composer Version (https://getcomposer.org/)
Latest NodeJS Version (https://nodejs.org/en)
PHP Version 8.2.0 (https://www.php.net/downloads.php)
 
### Frontend Dependencies

    React 18.2.0
    React Router DOM ^6.16.0
    Material UI ^5.14.11

### Backend Dependencies
	
	Laravel Framework 10.24.0


### Additional Tools

    MySQL 8
    WAMP Server 5 (or any suitable web server)

## Installation

To install the project, follow the steps below:

    1. Clone the project repository by executing the following command in your terminal or command prompt:

    	git clone https://github.com/DonMonsieur/backend.git

### Frontend

  	2.  Open your terminal or command prompt and navigate to the "react" folder within the project directory:

		cd backend_exam/react

	3.	Install the required dependencies by running the following command:

		npm install

	4.	Build the frontend assets by executing the following command:

	    npm run dev

###	Backend

	5.  Open your terminal or command prompt and navigate to the "backend_exam" folder within the project directory:

		cd backend_exam or cd ..

	6.	Update the PHP dependencies using Composer by running the following command:

		composer update

	7.	Rename the .env.example file to .env.

	8.	Run the database migrations and seed the initial data by executing the following command:

		php artisan migrate:fresh --seed

	10.	Start the PHP development server by running the following command:

    	php artisan serve

#Setup
### Localhost

	- ensure that the result of the npm run dev of frontend and php artisan serve of backend are <b>localhost:5173</b> and <b>http://127.0.0.1:8000</b>respectively
