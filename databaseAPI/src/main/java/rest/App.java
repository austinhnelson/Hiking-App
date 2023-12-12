package rest;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.table.TableUtils;
import rest.models.MapRoute;
import rest.models.UserPost;
import rest.models.User;
import com.google.gson.Gson;
import org.mindrot.jbcrypt.BCrypt;

import java.sql.SQLException;
import java.util.List;

import static spark.Spark.*;

public class App {
    public static void main(String[] args) throws SQLException {
        String databaseUrl = "jdbc:mysql://172.232.171.163/hiking_app_db";

        JdbcConnectionSource connectionSource;
        connectionSource = new JdbcConnectionSource(databaseUrl);
        connectionSource.setUsername("developer");
        connectionSource.setPassword("bE5OgL69GkQ0");

        Dao<User, Integer> userDao = DaoManager.createDao(connectionSource, User.class);
        Dao<UserPost, Integer> userPostDao = DaoManager.createDao(connectionSource, UserPost.class);
        Dao<MapRoute, Integer> routeDao = DaoManager.createDao(connectionSource, MapRoute.class);
        
        TableUtils.createTableIfNotExists(connectionSource, User.class);
        TableUtils.createTableIfNotExists(connectionSource, UserPost.class);
        TableUtils.createTableIfNotExists(connectionSource, MapRoute.class);

        Gson gson = new Gson();

        post("/signup", (req, res) -> {
            String username = req.queryParams("username");
            String password = req.queryParams("password");
            String email = req.queryParams("email");

            
            List<User> existingUsers = userDao.queryBuilder()
                    .where().eq("username", username)
                    .or().eq("email", email)
                    .query();

            if (!existingUsers.isEmpty()) {
                res.status(409); 
                return "Username or email is already registered.";
            }

            String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

            User user = new User();
            user.setUsername(username);
            user.setPassword(hashedPassword);
            user.setEmail(email);

            userDao.create(user);
            res.status(201); 
            return "User created successfully.";
        });

        
        post("/login", (req, res) -> {
            String username = req.queryParams("username");
            String password = req.queryParams("password");

            
            User user = userDao.queryBuilder()
                    .where().eq("username", username)
                    .queryForFirst();

            if (user != null && BCrypt.checkpw(password, user.getPassword())) {
               
                res.status(200); 
                return "Login successful.";
            } else {
                
                res.status(401); 
                return "Invalid username or password.";
            }
        });
        

        post("/userPost", (req, res) -> {
            String username = req.queryParams("username");
            int routeID = Integer.parseInt(req.queryParams("routeID"));
            String comment = req.queryParams("comment");

            UserPost userPost = new UserPost();
            userPost.setUsername(username);
            userPost.setRouteID(routeID);
            userPost.setComment(comment);

            userPostDao.create(userPost);
            List<UserPost> resultList = userPostDao.queryForMatchingArgs(userPost);
            if (resultList.size() == 0) throw new RuntimeException("unable to add post");
            res.status(201); // 201 Created
            return resultList.get(resultList.size() - 1).getId();
        });

        post("/route", (req, res) -> {
            String name = req.queryParams("name");
            String points = req.queryParams("points");

            MapRoute route = new MapRoute();
            route.setName(name);
            route.setPoints(points);

            routeDao.create(route);
            List<MapRoute> resultList = routeDao.queryForMatchingArgs(route);
            if (resultList.size() == 0) throw new RuntimeException("unable to add route");
            res.status(201); // 201 Created
            return resultList.get(resultList.size() - 1).getId();
        });

        get("/userPost/:id", (req, res) -> {
            res.type("application/json");
            String id = req.params(":id");
            if (id.equals("all")) return userPostDao.queryForAll();
            UserPost post = userPostDao.queryForId(Integer.parseInt(id));
            if (post != null) {
                return post;
            } else {
                res.status(404); // 404 Not found
                return "";
            }
        }, gson::toJson);

        get("/route/:id", (req, res) -> {
            res.type("application/json");
            String id = req.params(":id");
            if (id.equals("all")) return routeDao.queryForAll();
            MapRoute route = routeDao.queryForId(Integer.parseInt(id));
            if (route != null) {
                return route;
            } else {
                res.status(404); // 404 Not found
                return "";
            }
        }, gson::toJson);

        get("/userPost", (req, res) -> {
            res.type("application/json");
            String username = req.queryParams("username");
            return userPostDao.queryForEq("username", username);
        }, gson::toJson);


        after((request, response) -> response.header("Content-Encoding", "gzip"));
    }
}