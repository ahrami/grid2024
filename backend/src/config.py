from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    frontend_url: str = "http://localhost"
    frontend_port: int = 5173

settings = Settings()