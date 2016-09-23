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
        private SmtpClient _googleSmtpClient;   

        public StockWarning(HomeCinemaContext dbContext, SmtpClient googleSmtpClient)
        {
            _dbContext = dbContext;
            _googleSmtpClient = googleSmtpClient;
            sendList(outOfStock());
        }

        public void setCredentials()
        {

            //_googleSmtpClient.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
            _googleSmtpClient.Credentials = new System.Net.NetworkCredential
                 ("eugenestockwarning@gmail.com", "stockwarning"); // ***use valid credentials***
            //_googleSmtpClient.Port = 587;

            //Or your Smtp Email ID and Password
            _googleSmtpClient.EnableSsl = true;
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

        public void sendList(List<string> outOfStockMovieNames)
        {
            try
            {
                String email = "ALERT! No more available copies in the following films: ";
                int index = 1;
                foreach(var name in outOfStockMovieNames)
                {
                    if (index == outOfStockMovieNames.Count)
                    {
                        email += name;
                    }

                    else email += name + ", ";

                    index++;
                }

                _googleSmtpClient.Send(createMail(email));

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception in send: " + ex.Message);

            }
        }

        public List<string> outOfStock()
        {

            List<string> outOfStockNames = new List<string>();
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
                    outOfStockNames.Add(movie.Title);
                }

                availableCounter = 0;
            }

            return outOfStockNames;
        }

    }
}
