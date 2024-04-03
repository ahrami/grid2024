# Task 1

Set up a network of 2 Docker containers:

- First hosts a database
- Second is the entry point

You must demonstrate the ability to query the container1 DB from container2. Data in the SQLite database must not disappear when you restart the containers!

## To start

1. Clone the repo
   ```sh
   git clone https://github.com/ahrami/grid2024.git
   ```
2. Go to the repo directory and switch to the task branch
   ```sh
   git checkout task_1-basics_of_containerization
   ```
3. To build and start run
   ```sh
   docker-compose up --build --detach
   ```
4. Attach the client container
   ```sh
   docker attach --detach-keys='ctrl-c' python_client
   ```
5. Open another terminal and log the database container
   ```sh
   docker logs --follow sql_database
   ```

## How to use

- Type sqlite queries into the terminal attached to client container 
- Database container will log every query that comes in
- The result of query execution will be sent back to client and it will print it oun into the terminal
- To detach client press `ctrl-c` if you used the provided command to attach it. Or you can type `exit` to stop the client
- Database can only have one connection at any given time. To connect a new client, the other client needs to be stopped

## Example commands

1. Create a table
   ```sql
   create table example_table(id integer primary key, data)
   ```
2. Add values to the table
   ```sql
   insert into example_table(data) values ('example_data_1'), ('example_data_2'),  ('example_data_3')
   ```
3. Retrieve data from the table
   ```sql
   select * from example_table
   ```

## To run the client outside of docker

- On Linux
   ```sh
   python3 python_client_localhost/main.py
   ```

## To stop

- To just stop
   ```sh
   docker-compose down
   ```
- To stop and cleanup
   ```sh
   docker-compose down --rmi local --volumes
   ```
