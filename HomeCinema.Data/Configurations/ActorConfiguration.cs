using HomeCinema.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeCinema.Data.Configurations
{
    public class ActorConfiguration : EntityBaseConfiguration<Actor>
    {
        public ActorConfiguration()
        {
            Property(u => u.FirstName).IsRequired().HasMaxLength(100);
            Property(u => u.LastName).IsRequired().HasMaxLength(100);
            Property(u => u.MovieId).IsRequired();
        }
    }
}
