using HomeCinema.Data;
using HomeCinema.Data.Infrastructure;
using HomeCinema.Data.Repositories;
using HomeCinema.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace HomeCinema.Services
{
    public class StockWarning
    {
        private readonly HomeCinemaContext _dbContext;
        SmtpClient googleSmtpClient = new SmtpClient();

        public StockWarning(HomeCinemaContext dbContext)
        {
            _dbContext = dbContext;
            googleSmtpClient.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
            googleSmtpClient.Credentials = new System.Net.NetworkCredential
                 ("eugenestockwarning@gmail.com", "stockwarning"); // ***use valid credentials***
            googleSmtpClient.Port = 587;

            //Or your Smtp Email ID and Password
            googleSmtpClient.EnableSsl = true;
            sendList(outOfStock());
        }

        public MailMessage createMail(String message)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add("eugenestockwarning@gmail.com");
            mail.From = new MailAddress("eugenestockwarning@gmail.com");
            mail.Subject = "Out of Stock";

            mail.Body = message;

            mail.IsBodyHtml = true;

            return mail;
        }

        public void sendList(List<Tuple<string, int>> outOfStockMovies)
        {
            try
            {
                String email = "ALERT! No more available copies in the following films: ";
                int index = 1;
                foreach(var movie in outOfStockMovies)
                {
                    if (index == outOfStockMovies.Count)
                    {
                        email += createLink(movie.Item1, movie.Item2);
                    }

                    else email += createLink(movie.Item1, movie.Item2) + ", ";

                    index++;
                }

                googleSmtpClient.Send(createMail(email));

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in send: " + ex.Message);

            }
        }

        public List<Tuple<string, int>> outOfStock()
        {

            List<Tuple<string, int>> outOfStockNames = new List<Tuple<string, int>>();
            var movies = _dbContext.MovieSet.ToList();

            int availableCounter = 0;
            foreach (var movie in movies)
            {
                foreach (var item in movie.Stocks)
                {
                    if (item.IsAvailable == true)
                    {
                        availableCounter += 1;
                    }
                }

                if (availableCounter == 0)
                {
                    Tuple<string, int> nameAndID = new Tuple<string, int>(movie.Title, movie.ID);
                    outOfStockNames.Add(nameAndID);
                }

                availableCounter = 0;
            }

            return outOfStockNames;
        }

        public string createLink(string name, int id)
        {
            string part1 = "<a href = 'localhost:1487/#/movies/";
            string part2 = id.ToString() + "'>";
            string part3 = name + "</a>";
            string fullLink = part1 + part2 + part3;

            return fullLink;
        }

    }
}
