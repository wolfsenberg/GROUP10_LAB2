from app import app
from models.db import db
from models.users_model import User
from werkzeug.security import generate_password_hash
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

def seed_data():
    with app.app_context():
        try:
            print("Starting database seeding")

            seed_users = [
                User(
                    first_name="Admin",
                    middle_name="Main",
                    last_name="User",
                    email="admin@example1.com",
                    password=generate_password_hash("admin123"),
                    birthday=datetime(1990, 1, 1),
                    gender="Male",
                    phone_number="09171234567",
                    address="Makati City, Metro Manila",
                    student_id="2024-10112-MN-0"
                ),
                User(
                    first_name="Juan",
                    middle_name="Santos",
                    last_name="Dela Cruz",
                    email="juan@test1.com",
                    password=generate_password_hash("password123"),
                    birthday=datetime(2000, 5, 14),
                    gender="Male",
                    phone_number="09170000000",
                    address="Taguig City, Metro Manila",
                    student_id="2023-10111-MN-0"
                )
            ]



            for user in seed_users:
                existing_user = User.query.filter_by(email=user.email).first()
                if existing_user:
                    print(f"Skipping existing user: {user.email}")
                    continue
                db.session.add(user)
            
            db.session.commit()
            print("Database seeded successfully")

        except IntegrityError as e:
            db.session.rollback()
            print(f"Integrity error: {e}")

        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"SQLAlchemy error: {e}")
        except Exception as e:
            db.session.rollback()
            print(f"Unexpected error during seeding: {e}")

        finally:
            db.session.close()

if __name__ == "__main__":
    seed_data()