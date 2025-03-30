from flask import Blueprint, request, jsonify, session, redirect, url_for
from ..database.auth_operations import register_user, login_user, get_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not all(key in data for key in ['ssn_sin', 'name', 'address']):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    success, message = register_user(
        ssn_sin=data['ssn_sin'],
        name=data['name'],
        address=data['address']
    )
    
    if success:
        return jsonify({'success': True, 'message': message}), 201
    else:
        return jsonify({'success': False, 'message': message}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(key in data for key in ['ssn_sin', 'name']):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    success, message, user_data = login_user(
        ssn_sin=data['ssn_sin'],
        name=data['name']
    )
    
    if success:
        session['user'] = user_data
        return jsonify({
            'success': True,
            'message': message,
            'user': user_data,
            'redirect': url_for('home.homepage')
        }), 200
    else:
        return jsonify({'success': False, 'message': message}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'success': True, 'message': 'Logged out successfully'}), 200

@auth_bp.route('/check-auth', methods=['GET'])
def check_auth():
    user = session.get('user')
    if user:
        return jsonify({'authenticated': True, 'user': user}), 200
    return jsonify({'authenticated': False}), 401

@auth_bp.route('/user/<ssn_sin>', methods=['GET'])
def get_user_info(ssn_sin):
    success, message, user_data = get_user(ssn_sin)
    
    if success:
        return jsonify({
            'success': True,
            'message': message,
            'user': user_data
        }), 200
    else:
        return jsonify({'success': False, 'message': message}), 404 