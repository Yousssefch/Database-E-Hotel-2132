import bcrypt
from .db_connection import get_db_connection, close_db_connection

def register_user(ssn_sin, name, address):
    """
    Register a new user in the database
    Returns: (success, message)
    """
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            # Check if SSN/SIN already exists
            cursor.execute("""
                SELECT ssn_sin FROM users 
                WHERE ssn_sin = %s
            """, (ssn_sin,))
            
            if cursor.fetchone():
                return False, "SSN/SIN already exists"
            
            # Insert new user
            cursor.execute("""
                INSERT INTO users (ssn_sin, name, address)
                VALUES (%s, %s, %s)
            """, (ssn_sin, name, address))
            
            connection.commit()
            return True, "Registration successful"
            
        except Exception as error:
            print(f"Error during registration: {error}")
            connection.rollback()
            return False, "Registration failed"
        finally:
            cursor.close()
            close_db_connection(connection)
    return False, "Database connection failed"

def login_user(ssn_sin, name):
    """
    Authenticate a user using SSN/SIN and name
    Returns: (success, message, user_data)
    """
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            cursor.execute("""
                SELECT ssn_sin, name, address, date_of_registration
                FROM users 
                WHERE ssn_sin = %s AND name = %s
            """, (ssn_sin, name))
            
            user = cursor.fetchone()
            
            if user:
                user_data = {
                    'ssn_sin': user[0],
                    'name': user[1],
                    'address': user[2],
                    'date_of_registration': user[3]
                }
                return True, "Login successful", user_data
            else:
                return False, "Invalid SSN/SIN or name", None
                
        except Exception as error:
            print(f"Error during login: {error}")
            return False, "Login failed", None
        finally:
            cursor.close()
            close_db_connection(connection)
    return False, "Database connection failed", None

def get_user(ssn_sin):
    """
    Get user data by SSN/SIN
    Returns: (success, message, user_data)
    """
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            cursor.execute("""
                SELECT ssn_sin, name, address, date_of_registration
                FROM users WHERE ssn_sin = %s
            """, (ssn_sin,))
            
            user = cursor.fetchone()
            
            if user:
                user_data = {
                    'ssn_sin': user[0],
                    'name': user[1],
                    'address': user[2],
                    'date_of_registration': user[3]
                }
                return True, "User found", user_data
            else:
                return False, "User not found", None
                
        except Exception as error:
            print(f"Error while fetching user: {error}")
            return False, "Error fetching user", None
        finally:
            cursor.close()
            close_db_connection(connection)
    return False, "Database connection failed", None 