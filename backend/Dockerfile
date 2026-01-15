FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
WORKDIR /backend

# docker build -t solit-backend:latest .
# docker push IMAGE arn/solit-backend:latest
# ENV variables
# ENV ASPNETCORE_ENVIRONMENT=Development
# ENV ASPNETCORE_HTTP_PORTS= 
# ENV ASPNETCORE_ENVIRONMENT=Production
ENV DOTNET_ENVIRONMENT=Production
COPY . .

EXPOSE 80
ENV ASPNETCORE_URLS=http://+:80.

EXPOSE 80
FROM base AS build
WORKDIR /src
COPY ["backend.csproj", "./"]
RUN dotnet restore
COPY . .
WORKDIR "/src/."
RUN dotnet build "backend.csproj" -c Release -o /backend/build

FROM build AS publish
RUN dotnet publish -c Release -o /backend/publish /p:UseAppHost=false


FROM base AS final

WORKDIR /backend
COPY --from=publish /backend/publish .
ENTRYPOINT ["dotnet", "backend.dll"]