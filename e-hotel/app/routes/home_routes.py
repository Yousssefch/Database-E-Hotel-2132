from flask import Blueprint, render_template, session, redirect, url_for

home_bp = Blueprint('home', __name__)

@home_bp.route('/homepage')
def homepage():
    # Check if user is logged in
    user = session.get('user')
    if not user:
        return redirect(url_for('auth.login'))
    
    return render_template('homepage.html', user=user) 