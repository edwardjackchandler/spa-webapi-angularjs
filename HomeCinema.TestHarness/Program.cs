using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using HomeCinema.Services;
using HomeCinema.Data;
using HomeCinema.Data.Repositories;
using HomeCinema.Entities;

namespace HomeCinema.TestHarness
{
    class Program
    {

        static void Main(string[] args)
        {
            SmtpClient googleSmtpClient = new SmtpClient("smtp.gmail.com", 587);

            HomeCinemaContext context = new HomeCinemaContext();

            //var movies = _moviesRepository.GetAll().ToList();

            StockWarning s = new StockWarning(context, googleSmtpClient);
            s.outOfStock();


            //googleSmtpClient.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
            //googleSmtpClient.Credentials = new System.Net.NetworkCredential
            //     ("eugenestockwarning@gmail.com", "stockwarning"); // ***use valid credentials***
            //googleSmtpClient.Port = 587;

            ////Or your Smtp Email ID and Password
            //googleSmtpClient.EnableSsl = true;


        }
}
}
