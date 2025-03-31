from .db_connection import get_db_connection, close_db_connection
import os

def cleanup_database():
    """
    Thoroughly clean up the database by dropping all tables and their dependencies
    """
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            # Disable foreign key checks temporarily
            cursor.execute("SET session_replication_role = 'replica';")
            
            # Drop all tables in the public schema
            cursor.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)
            tables = cursor.fetchall()
            
            for table in tables:
                table_name = table[0]
                print(f"Dropping table: {table_name}")
                cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
            
            # Re-enable foreign key checks
            cursor.execute("SET session_replication_role = 'origin';")
            
            connection.commit()
            print("Database cleanup completed successfully")
            
        except Exception as error:
            print(f"Error during database cleanup: {error}")
            connection.rollback()
        finally:
            cursor.close()
            close_db_connection(connection)

def create_indexes():
    """
    Create necessary indexes for optimizing database queries
    """
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            # Read and execute the indexes SQL file
            current_dir = os.path.dirname(os.path.abspath(__file__))
            indexes_file = os.path.join(current_dir, 'create_indexes.sql')
            
            with open(indexes_file, 'r') as file:
                indexes_sql = file.read()
                cursor.execute(indexes_sql)
            
            connection.commit()
            print("Database indexes created successfully")
            
        except Exception as error:
            print(f"Error while creating indexes: {error}")
            connection.rollback()
        finally:
            cursor.close()
            close_db_connection(connection)

def create_tables():
    """
    Create all necessary tables for the hotel management system
    """
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            # First, let's check if tables exist
            cursor.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)
            existing_tables = cursor.fetchall()
            print("Existing tables:", [table[0] for table in existing_tables])
            
            # Create Users table with updated structure
            print("Creating users table...")
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    ssn_sin VARCHAR(20) PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    address TEXT NOT NULL,
                    date_of_registration TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create Hotels table
            print("Creating hotels table...")
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS hotels (
                    hotel_id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    description TEXT,
                    address TEXT NOT NULL,
                    rating DECIMAL(2,1),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create Rooms table
            print("Creating rooms table...")
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS rooms (
                    room_id SERIAL PRIMARY KEY,
                    hotel_id INTEGER REFERENCES hotels(hotel_id),
                    room_number VARCHAR(10) NOT NULL,
                    room_type VARCHAR(50) NOT NULL,
                    price_per_night DECIMAL(10,2) NOT NULL,
                    capacity INTEGER NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create Reservations table with updated user reference
            print("Creating reservations table...")
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS reservations (
                    reservation_id SERIAL PRIMARY KEY,
                    user_ssn_sin VARCHAR(20) REFERENCES users(ssn_sin),
                    room_id INTEGER REFERENCES rooms(room_id),
                    check_in_date DATE NOT NULL,
                    check_out_date DATE NOT NULL,
                    status VARCHAR(20) DEFAULT 'pending',
                    total_price DECIMAL(10,2) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            connection.commit()
            
            # Create indexes after tables are created
            print("Creating database indexes...")
            create_indexes()
            
            # Verify tables were created
            cursor.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)
            tables = cursor.fetchall()
            print("\nFinal tables in database:", [table[0] for table in tables])
            
        except Exception as error:
            print(f"Error while creating tables: {error}")
            connection.rollback()
        finally:
            cursor.close()
            close_db_connection(connection)
    else:
        print("Failed to establish database connection")

if __name__ == "__main__":
    print("Starting database initialization...")
    print("Performing thorough database cleanup...")
    cleanup_database()
    print("Creating new tables...")
    create_tables()
    print("Database initialization complete!") 