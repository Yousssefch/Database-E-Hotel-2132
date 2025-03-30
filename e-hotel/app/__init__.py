from flask import Flask
    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Allow cross-site cookie sending
    app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
    Session(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(home_bp)
    
    return app 