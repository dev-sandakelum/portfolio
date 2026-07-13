## Microsoft Azure යනු කුමක්ද?

**Microsoft Azure** යනු Microsoft විසින් ලබා දෙන cloud computing platform එකකි. Virtual machines, databases, AI services, networking — ඇතුළු services 200+ ක් Azure හි ඇත.

## ප්‍රධාන Service Categories

### Compute
- **Azure Virtual Machines** — cloud ඇතුළත virtual servers
- **Azure App Service** — web apps host කිරීම
- **Azure Functions** — serverless computing

### Storage
- **Azure Blob Storage** — unstructured data ගබඩා කිරීම
- **Azure Files** — managed file shares
- **Azure Table Storage** — NoSQL key-value store

### Databases
- **Azure SQL Database** — managed SQL server
- **Azure Cosmos DB** — globally distributed NoSQL
- **Azure Database for PostgreSQL** — managed PostgreSQL

### Networking
- **Azure Virtual Network (VNet)** — private network
- **Azure Load Balancer** — traffic distribution
- **Azure CDN** — content delivery network

## Azure Portal භාවිතය

Azure Portal (`portal.azure.com`) හරහා resources create, manage, monitor කළ හැකිය.

```bash
# Azure CLI ස්ථාපනය කිරීමෙන් පසු login
az login

# Resource group සෑදීම
az group create --name MyResourceGroup --location eastus

# Simple web app deploy කිරීම
az webapp create \
  --resource-group MyResourceGroup \
  --plan MyAppServicePlan \
  --name my-unique-app-name \
  --runtime "NODE:20-lts"
```

## Pricing Model

Azure හි **Pay-as-you-go** pricing model ඇත — ඔබ use කළ resources සඳහා පමණක් ගෙවීම. Free tier ද ලැබේ:

| Service | Free Tier |
|---------|-----------|
| App Service | 10 web apps (F1 tier) |
| Azure SQL | 32 GB storage |
| Cosmos DB | 1000 RU/s |
| Functions | 1M requests/month |

## Azure Regions

Azure globally 60+ regions හි operate වේ. ඔබගේ users ට ළඟම region select කිරීම latency අඩු කරයි.

> **ඉඟිය:** Azure Free Account සමග ආරම්භ කිරීමෙන් $200 credit 30 days සඳහා ලබා ගත හැකිය.
