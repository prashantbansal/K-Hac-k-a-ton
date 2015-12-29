using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB;
using MongoDB.Linq;

namespace MongoDBBlog.Tester
{
    public class Logic
    {
        public void GetMongoDBData()
        {
            var mongo = new Mongo();
            mongo.Connect();

            //Get the blog database. If it doesn't exist, that's ok because MongoDB will create it 
            //for us when we first use it. Awesome!!!
            var db = mongo.GetDatabase("blog");

            //Get the Post collection. By default, we'll use
            //the name of the class as the collection name. Again,
            //if it doesn't exist, MongoDB will create it when we first use it.
            var collection = db.GetCollection<Post>();

            //this deletes everything out of the collection so we can run this over and over again.
            collection.Remove(p => true);

            //Create a Post to enter into the database.
            var post = new Post()
            {
                Title = "My First Post",
                Body = "This isn't a very long post.",
                CharCount = 27,
                Comments = new List<Comment>
                {
                    { new Comment() { TimePosted = new DateTime(2010,1,1), 
                                      Email = "bob_mcbob@gmail.com", 
                                      Body = "This article is too short!" } },
                    { new Comment() { TimePosted = new DateTime(2010,1,2), 
                                      Email = "Jane.McJane@gmail.com", 
                                      Body = "I agree with Bob." } }
                }
            };
            collection.Save(post);
        }
    }
}
