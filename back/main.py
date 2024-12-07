
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from auth import create_access_token, verify_password, get_current_user
from models import User
from database import get_db
from schemas import UserCreate, UserLogin, Token, UserInDB
from fastapi.security import OAuth2PasswordBearer
from api_routers.goal import goal_router
from api_routers.user import user_router

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app.include_router(goal_router)
app.include_router(user_router)
# Роуты для регистрации и логина
@app.post("/register", response_model=UserInDB)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    new_user = User(full_name=user.full_name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def hash_password(password: str) -> str:
    return verify_password(password)

@app.post("/token", response_model=Token)
def login_for_access_token(form_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.email).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=UserInDB)
def read_users_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    current_user = get_current_user(token=token, db=db)
    return current_user
