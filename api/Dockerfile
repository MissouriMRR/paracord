FROM python:3-slim

COPY . /app
WORKDIR /app

EXPOSE 3000

RUN pip3 install pipenv
RUN pipenv install --system --deploy

CMD python3 manage.py -c all && python3 run.py --host=0.0.0.0
