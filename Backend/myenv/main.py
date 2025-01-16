from flask import Flask, request, jsonify,session
from flask_cors import CORS
import sqlite3
from flask import make_response
from flask_session import Session
import logging
import json
import bcrypt
import traceback
from datetime import datetime
import base64

def generate_order_id():
    import uuid
    return str(uuid.uuid4())

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", supports_credentials=True)

app.config['SECRET_KEY'] = 'dahfaksjhksah'
app.config['SESSION_TYPE'] = 'filesystem'  # Use filesystem to store sessions
app.config['SESSION_COOKIE_NAME'] = 'Movie Booking System'
Session(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

DATABASE_PATH = "./Backend/Database/database.sqlite"

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/users', methods=["GET", "POST"])
def manage_users():
    try:
        if request.method == "GET":
            return get_users()
        elif request.method == "POST":
            return create_user()
    except Exception as e:
        logging.error(f"Error in manage_users: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/api/users/<int:id>', methods=['PUT','DELETE'])
def update_user(id):
    if request.method == "PUT":
        try:
            data = request.json
            print(f"Received data: {data}")

            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            phone = data.get('phone')
            role = data.get('role')

            if role is None:
                return jsonify({'error': 'Role must be provided'}), 400

            conn = get_db_connection()
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            query = 'UPDATE user SET name=?, email=?, password=?, phone=?, role=? WHERE id=?'
            conn.execute(query, (name, email, hashed_password, phone, role, id))
            conn.commit()
            conn.close()

            return jsonify({'message': 'User updated successfully'}), 200
        except sqlite3.IntegrityError as e:
            logging.error(f"Error during user update: {str(e)}")
            return jsonify({'error': 'Database integrity error'}), 400
        except Exception as e:
            logging.error(f"Error during user update: {str(e)}")
            return jsonify({'error': str(e)}), 500

    elif request.method == "DELETE":
        try:
            conn = get_db_connection()
            conn.execute('DELETE FROM user WHERE id=?', (id,))
            conn.commit()
            conn.close()

            return jsonify({'message': 'User deleted successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

def get_users():
    try:
        conn = get_db_connection()
        logging.debug("Database connection successful")
        cursor = conn.cursor()
        cursor.execute('SELECT name FROM sqlite_master WHERE type="table";')
        tables = cursor.fetchall()
        table_names = [table['name'] for table in tables]
        print("Tables in database:", table_names)

        users = conn.execute('SELECT * FROM users').fetchall()
        conn.close()

        user_list = [{"id": user["id"], "username": user["username"], "email": user["email"], "phone": user["phone"], 
                      "address": user["address"], "age": user["age"], "gender": user["gender"], "created_at": user["created_at"]} 
                     for user in users]
        return jsonify({"users": user_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def create_user():
    try:
        data = request.json
        print(f"Received data: {data}")
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        phone = data.get('phone', '')
        address = data.get('address', '')
        age = data.get('age', None)
        gender = data.get('gender', '')

        if not username or not email or not password:
            return jsonify({"error": "Required fields missing"}), 400
        
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        conn = get_db_connection()
        conn.execute('INSERT INTO users (username, email, hashedPassword, phone, address, age, gender) VALUES (?, ?, ?, ?, ?, ?, ?) ',
                     (username, email, hashed_password, phone, address, age, gender))
        conn.commit()
        conn.close()

        return jsonify({"message": "User created successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    if not username_or_email or not password:
        return jsonify({'error': 'Missing username_or_email or password'}), 400

    try:
        conn = get_db_connection()
        user = conn.execute(
            'SELECT * FROM user WHERE name = ? OR email = ?', 
            (username_or_email, username_or_email)
        ).fetchone()
        conn.close()

        if user:
            stored_hashed_password = user['password']
            if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
                session['user_id'] = user['id']
                session['user_name'] = user['name']
                session['user_email'] = user['email']
                session['user_phone'] = user['phone']
                session['user_role'] = user['role']
                print("Session data after login:", dict(session))
                return jsonify({
                    'message': 'Login successful',
                    'user': {
                        'name': user['name'],
                        'email': user['email']
                    }
                })
                response.set_cookie('your_session_cookie_name', 'value')  # Set your session cookie
                return response, 200
            else:
                return jsonify({'error': 'Invalid credentials'}), 401
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        logging.error(f"Error during login: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/logout', methods=['POST'])
def logout():
    try:
        session.clear()
        return jsonify({'message': 'Logged out successfully'}), 200
    except Exception as e:
        print(f"Error during logout: {e}")
        return jsonify({'error': 'Failed to log out'}), 500
    
@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        user_id = data.get('user_id')
        total_amount = data.get('total_amount')
        status = data.get('status')
        shipping_address = data.get('shipping_address')
        
        if not user_id or not total_amount or not status or not shipping_address:
            return jsonify({"error": "Required fields missing"}), 400
        
        conn = get_db_connection()
        conn.execute('INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (?, ?, ?, ?)',
                     (user_id, total_amount, status, shipping_address))
        conn.commit()
        conn.close()

        return jsonify({"message": "Order created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        conn = get_db_connection()
        orders = conn.execute('SELECT * FROM orders').fetchall()
        conn.close()

        order_list = [{"id": order["id"], "user_id": order["user_id"], "total_amount": order["total_amount"],
                       "status": order["status"], "shipping_address": order["shipping_address"], 
                       "created_at": order["created_at"]} for order in orders]
        return jsonify({"orders": order_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/order_items', methods=['POST'])
def add_items_to_order():
    try:
        data = request.json
        order_id = data.get('order_id')
        item_id = data.get('item_id')
        quantity = data.get('quantity')
        price = data.get('price')
        
        if not order_id or not item_id or not quantity or not price:
            return jsonify({"error": "Required fields missing"}), 400
        
        conn = get_db_connection()
        conn.execute('INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)',
                     (order_id, item_id, quantity, price))
        conn.commit()
        conn.close()

        return jsonify({"message": "Item added to order successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/order_items/<int:order_id>', methods=['GET'])
def get_items_in_order(order_id):
    try:
        conn = get_db_connection()
        items = conn.execute('SELECT * FROM order_items WHERE order_id=?', (order_id,)).fetchall()
        conn.close()

        item_list = [{"item_id": item["item_id"], "quantity": item["quantity"], "price": item["price"]} for item in items]
        return jsonify({"order_items": item_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/items', methods=['POST'])
def create_item():
    try:
        # Retrieve JSON data
        data = request.get_json()

        # Extract fields
        name = data.get('name')
        category = data.get('category')
        price = data.get('price')
        stock = data.get('stock')
        description = data.get('description')
        image_data = data.get('image_data')

        # Validate required fields
        if not all([name, category, price, stock, image_data]):
            return jsonify({"error": "Required fields missing"}), 400

        # Save data to the database
        conn = get_db_connection()
        conn.execute(
            'INSERT INTO items (name, category, price, stock, description, image_data) VALUES (?, ?, ?, ?, ?, ?)',
            (name, category, price, stock, description, image_data)
        )
        conn.commit()
        conn.close()

        return jsonify({"message": "Item created successfully!"}), 201
    except Exception as e:
        traceback.print_exc()  # Print full traceback for better debugging
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/items/<int:id>', methods=['PUT'])
def update_item(id):
    try:
        data = request.json
        name = data.get('name')
        category = data.get('category')
        price = data.get('price')
        stock = data.get('stock')
        description = data.get('description')

        # Check if required fields are provided
        if not name or not category or not price or not stock:
            return jsonify({"error": "Missing required fields"}), 400

        conn = get_db_connection()
        conn.execute('UPDATE items SET name=?, category=?, price=?, stock=?, description=? WHERE id=?',
                     (name, category, price, stock, description, id))
        conn.commit()
        conn.close()

        return jsonify({"message": "Item updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/items/<category>', methods=['GET'])
def get_items_by_category(category):
    try:
        conn = get_db_connection()
        items = conn.execute('SELECT * FROM items WHERE category=?', (category,)).fetchall()
        conn.close()

        # Build response
        item_list = [
            {
                "id": item["id"],
                "name": item["name"],
                "category": item["category"],
                "price": item["price"],
                "stock": item["stock"],
                "description": item["description"],
                "image_data": base64.b64encode(item["image_data"]).decode('utf-8') if isinstance(item["image_data"], bytes) else item["image_data"]
            }
            for item in items
        ]
        return jsonify({"items": item_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8080,debug=True)