import psycopg2
from psycopg2 import Error

# Database connection parameters
DB_PARAMS = {
    'host': 'db-assignment-b-base.duckdns.org',
    'port': '5050',
    'database': 'postgres',  # default database name
    'user': 'user',
    'password': 'winter2025'
}

def get_db_connection():
    """
    Create and return a database connection
    """
    try:
        print("Attempting to connect to database with parameters:", {k: v for k, v in DB_PARAMS.items() if k != 'password'})
        connection = psycopg2.connect(**DB_PARAMS)
        print("Successfully connected to database!")
        return connection
    except (Exception, Error) as error:
        print(f"Error while connecting to PostgreSQL: {error}")
        return None

def close_db_connection(connection):
    """
    Close the database connection if it exists
    """
    if connection:
        connection.close()
        print("PostgreSQL connection is closed") 