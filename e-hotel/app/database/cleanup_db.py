from .db_connection import get_db_connection, close_db_connection

def cleanup_database():
    """
    Thoroughly clean up the database by dropping all tables and their dependencies
    """
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            
            # First, let's see what tables exist
            cursor.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)
            existing_tables = cursor.fetchall()
            print("Tables found before cleanup:", [table[0] for table in existing_tables])
            
            # Disable foreign key checks temporarily
            cursor.execute("SET session_replication_role = 'replica';")
            
            # Drop all tables in the public schema
            for table in existing_tables:
                table_name = table[0]
                print(f"Dropping table: {table_name}")
                # Try both with and without quotes to handle case sensitivity
                cursor.execute(f"DROP TABLE IF EXISTS \"{table_name}\" CASCADE")
                cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
            
            # Also try to drop tables with known names
            known_tables = ['users', 'hotels', 'rooms', 'reservations', 'hotel']
            for table_name in known_tables:
                print(f"Attempting to drop known table: {table_name}")
                cursor.execute(f"DROP TABLE IF EXISTS \"{table_name}\" CASCADE")
                cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
            
            # Re-enable foreign key checks
            cursor.execute("SET session_replication_role = 'origin';")
            
            # Verify all tables are dropped
            cursor.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)
            remaining_tables = cursor.fetchall()
            
            if remaining_tables:
                print("Warning: Some tables still exist:", [table[0] for table in remaining_tables])
                # Try to force drop remaining tables
                for table in remaining_tables:
                    table_name = table[0]
                    print(f"Force dropping table: {table_name}")
                    cursor.execute(f"DROP TABLE IF EXISTS \"{table_name}\" CASCADE")
                    cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
            
            connection.commit()
            
            # Final verification
            cursor.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """)
            final_tables = cursor.fetchall()
            
            if final_tables:
                print("ERROR: Tables still exist after cleanup:", [table[0] for table in final_tables])
                # Try one last time with a different approach
                for table in final_tables:
                    table_name = table[0]
                    print(f"Final attempt to drop table: {table_name}")
                    cursor.execute(f"DROP TABLE IF EXISTS \"{table_name}\" CASCADE")
                    cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
                    cursor.execute(f"DROP TABLE IF EXISTS {table_name.lower()} CASCADE")
                    cursor.execute(f"DROP TABLE IF EXISTS {table_name.upper()} CASCADE")
                
                connection.commit()
                
                # One last verification
                cursor.execute("""
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                """)
                last_tables = cursor.fetchall()
                
                if last_tables:
                    print("CRITICAL ERROR: Tables still exist after all cleanup attempts:", [table[0] for table in last_tables])
                else:
                    print("Database cleanup completed successfully after final attempt")
            else:
                print("Database cleanup completed successfully - all tables removed")
            
        except Exception as error:
            print(f"Error during database cleanup: {error}")
            connection.rollback()
        finally:
            cursor.close()
            close_db_connection(connection)
    else:
        print("Failed to establish database connection")

if __name__ == "__main__":
    print("Starting database cleanup...")
    cleanup_database()
    print("Database cleanup process completed!") 