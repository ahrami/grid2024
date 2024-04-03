# Task 1

Set up a network of 2 Docker containers:

- First hosts a database
- Second is the entry point

You must demonstrate the ability to query the container1 DB from container2. Data in the SQLite database must not disappear when you restart the containers!

## To start

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. In the repo directory run
   ```sh
   docker-compose up --build --detach
   ```
3. Attach the client container
   ```sh
   docker attach --detach-keys='ctrl-c' python_client
   ```
4. Open another terminal and log the database container
   ```sh
   docker logs --follow sql_database
   ```

## How to use

- Type sqlite queries into the terminal attached to client container 
- Database container will log every query that comes in
- The result of query execution will be sent back to client and it will print it oun into the terminal
- To detach press `ctrl-c` or type `exit` to stop the container

## Example commands

1. Create a table
   ```sql
   create table example_table(id integer primary key, data)
   ```
2. Add values to the table
   ```sql
   insert into example_table values (1, 'some_data_1'), (2, 'some_data_2'),  (3, 'some_data_2')
   ```
3. Retrieve data from the table
   ```sql
   select * from example_table
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
