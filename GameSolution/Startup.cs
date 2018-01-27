using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using DotNetify;
using System.Threading.Tasks;
using Web.DTO;

namespace Web
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMemoryCache();
            services.AddSignalR();
            services.AddDotNetify();
            services.AddSingleton<IEventAggregator, EventAggregator>();
            services.AddSingleton<GameState>();
        }
        public void Configure(IApplicationBuilder app)
        {
            app.UseCors(builder => builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
            app.UseWebSockets();
            app.UseSignalR(routes => routes.MapDotNetifyHub());
            //app.UseDotNetify();
            app.UseDotNetify(config => config.UseMiddleware<ContextMiddleware>());
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("HelloWorld server");
            });
        }

        public class ContextMiddleware : DotNetify.IMiddleware
        {
            private readonly IEventAggregator _eventAggregator;
            public ContextMiddleware(IEventAggregator eventAggregator)
            {
                _eventAggregator = eventAggregator;
            }
            public Task Invoke(DotNetifyHubContext context, NextDelegate next)
            {
                _eventAggregator.Context = context.CallerContext.ConnectionId;
                return next(context);
            }
        }
    }
}