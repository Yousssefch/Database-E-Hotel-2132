from flask import Flask
from flask_session import Session
from flask_cors import CORS
from .routes.auth_routes import auth_bp
from .routes.home_routes import home_bp

def create_app():
    app = Flask(__name__)
    
    # Configure CORS
    CORS(app, 
         resources={r"/api/*": {
             "origins": ["http://localhost:3000"],
             "supports_credentials": True,
             "allow_headers": ["Content-Type"],
             "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
         }})
    
    # Configure session
    app.config['SECRET_KEY'] = 'your-secret-key-here'  # Change this to a secure secret key
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Allow cross-site cookie sending
    app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
    Session(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(home_bp)
    
    return app 