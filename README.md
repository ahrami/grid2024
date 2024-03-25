# Task 1

## Task itself

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
5. To stop and cleanup
   ```sh
   docker-compose down --rmi local
   ```