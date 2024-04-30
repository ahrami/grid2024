FROM python:3.10-alpine

WORKDIR /app

COPY . .

RUN python3 -m venv .venv

RUN source .venv/bin/activate

RUN python3 -m pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--root-path", "/api", "--host", "0.0.0.0", "--port", "8000"]