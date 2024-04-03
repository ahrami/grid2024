# Task 1

Set up a network of 2 Docker containers:

- One Hosts the database (SQLite or else)
- Other is your entry point

You must demonstrate the ability to query the container1 DB from container2. Data in the SQLite database must not disappear when you restart the containers!

<b>DoD:</b> GitLab/GitHub repo with Dockerfiles for both containers, docker-compose for the whole system, README file with list of commands to launch and test.

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

## To stop

- To just stop
   ```sh
   docker-compose down
   ```
- To stop and cleanup
   ```sh
   docker-compose down --rmi local --volumes
   ```
