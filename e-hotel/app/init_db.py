from .database.db_operations import create_tables

def init_database():
    print("Initializing database...")
    create_tables()
    print("Database initialization complete!")

if __name__ == "__main__":
    init_database() 