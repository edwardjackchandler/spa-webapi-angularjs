using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Quartz;
using Quartz.Impl;

namespace OutOfStockService
{
    class MyJob : IJob
    {
        public void Execute(IJobExecutionContext context)
        {
            
        }
    }
}
